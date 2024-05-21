import pandas as pd
import openai
import os

from dotenv import load_dotenv
from flask import Flask, jsonify,request
from flask_cors import CORS

# Load the .env file
load_dotenv()


openai.api_key = 'sk-proj-4aA3sWXXECCfqT4uJ5uTT3BlbkFJuq3ADd5Ttg6WZb6dGzff'
doctors_df = pd.read_csv('doctors.csv')




app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_doctors_by_criteria(specialty, location, gender):
    if (gender.capitalize() not in ['Male', "Female"]) and (location.capitalize() not in doctors_df.location.unique()): # if no gender/loc preference
      filtered_doctors = doctors_df[
        (doctors_df['title'] == specialty.capitalize())
      ]
    elif gender.capitalize() not in ['Male', "Female"]: # if no gender preference
      filtered_doctors = doctors_df[
        (doctors_df['title'] == specialty.capitalize()) &
        (doctors_df['location'] == location.capitalize())
      ]
    elif location.capitalize() not in doctors_df.location.unique():
      filtered_doctors = doctors_df[ # if gender preference
          (doctors_df['title'] == specialty.capitalize()) &
          (doctors_df['gender'] == gender.capitalize())
      ]
    else:
      filtered_doctors = doctors_df[ # if gender preference
          (doctors_df['title'] == specialty.capitalize()) &
          (doctors_df['location'] == location.capitalize()) &
          (doctors_df['gender'] == gender.capitalize())
      ]
    return filtered_doctors
# Nearest Location
def deduce_location(user_input):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a helpful assistant. Based on the following location, CHOOSE WHICH OF THESE FROM THE GIVEN LIST OF LOCATIONS:{doctors_df.location.unique()} EXACTLY MATCH THE USER INPUT? If there are no matches, return the name of the location FROM THE LIST PROVIDED which is the geographically closest to the user input. Return just the location name and nothing else, as a single word."},
            {"role": "user", "content": f"{user_input}"}
        ]
    )
    return response.choices[0].message['content'].strip()

def missing_value_handler(location, pref_gender):
  if len(pref_gender) == 0:
    pref_gender = input("Enter the preferred gender of the doctor (Male/Female/NA): ")
    pref_gender = pref_gender.capitalize()

  if len(location) == 0:
    location = input("Enter your preferred location: ")
    location = deduce_location(location).capitalize()

  return location, pref_gender


def ask_chatbot(user_prompt):
  response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"""

            You are a helpful assistant.  Based on the following user input, Deduce four things: Validity of the question,Specialty of the doctor to refer, preferred gender of the doctor, as well as location of the patient
            All values should be chosen from:
            Validity options : VALID OR OUTOFSCOPE
            Specialties Available: {doctors_df.title.unique()},
            Preferred Gender Available: {doctors_df.gender.unique()}
            (SAY EXACTLY 'NONE'(all caps) AND NOTHING DIFFERENT IF PREFERRED GENDER WAS NOT MENTIONED OR WAS OMITTED, SAY 'NA' IF USER EXPLICITY SAYS THAT THEY HAVE NO PREFERENCE OR SOMETHING AKIN TO IT IN THE PROMPT (DONT USE NA OTHERWISE TO REPRESENT NONE)),
            Locations Available: {doctors_df.location.unique()}
            (IF A LOCATION IS GIVEN BUT IT IS NOT IN THE LIST, CHOOSE THE GEOGRAPHICALLY CLOSEST LOCATION TO THE ONE IN USER INPUT, FROM THE GIVEN LIST. RETURN EXACTLY 'NONE' (all caps) AND NOTHING DIFFERENT IF NOTHING RELATED TO LOCATION INFORMATION CAME FROM USER DO NOT MAKE ASSUMPTIONS AND DONT USE NA IN PLACE OF NONE FOR Location (its fine for gender)).

            Return in the format of X : Y (like QuesValidity:<VALID OR OUTOFSCOPE> , Specialty: <name of specialty>, Pref_gender: <preferred gender or NONE>, Location: <location or NONE> )
            """},
            {"role": "user", "content": f"{user_prompt}"}
        ]
    )
  
  ans = response.choices[0].message['content'].strip()
  specialty = ""
  location = ""
  pref_gender = ""
  print(ans+"hello")

  invalid_words = ["OUTOFSCOPE", "outofscope", "Outofscope"]
  if any(word.lower() in ans.lower() for word in invalid_words):
    return "sorry please ask a valid question"

  for i in doctors_df.title.unique():
    if (i.lower() in ans) or (i.capitalize() in ans):
      specialty = i.capitalize()
      break

  for i in doctors_df.location.unique():
    if (i.lower() in ans) or (i.capitalize() in ans):
      location = i.capitalize()
      break

  for i in doctors_df.gender.unique():
    if (i.lower() in ans) or (i.capitalize() in ans):
      pref_gender = i.capitalize()
      break

#   location, pref_gender = missing_value_handler(location, pref_gender)
  print(specialty, location, pref_gender)
  final_output = get_doctors_by_criteria(specialty, location, pref_gender)
  print(final_output)
  if final_output.empty:
     return """Sorry no doctor available in that {} domain """.format(specialty)

  return final_output




@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    user_prompt = data.get('user_prompt')
    response = ask_chatbot(user_prompt)
    if(isinstance(response, str)):
       return jsonify({'response': response})
    response=response.to_json() 
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
