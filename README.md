# Chinese Character Recognition Test
This application is intended for Chinese teachers and language researchers to obtain an estimate of the number of Chinese characters that their students or research subjects recognize. The application contains the following features:

-A back-end built with Ruby on Rails and PostgreSQL

-A front-end built with React where teachers/researchers can create classes, invite students to join, and view student test scores and information about individual questions and responses.

-Students can optionally join a specific class and can take the test to see their estimated character recognition ability.

-Administrators can update the character database, editing individual character information and available responses.

## Running
First set up:

 From the root directory run:

 $ bundle install
 $ rails db: migrate db:seed
 $ npm install --prefix client

Then to run, in two separate console tabs

 $ rails s
 $ npm start --prefix client


## Test info

-This test characters are based on HSK (Hanyu Shuiping Kaoshi 汉语水平考试) vocabulary levels 1-9.

-During the test the student is provided with a test character and four words containing that character as well as the option "I don't know". One option is a real Chinese word and the other three are made up (incorrect) words. The student has 20 seconds to choose or the answer is marked as incorrect, and the test progresses to the next question.

-Once the student has answered 10 questions in a row incorrectly, the test concludes and the student is given their results.
