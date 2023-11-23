serverless deploy
endpoint: GET - https://cw6rmblwmh.execute-api.ap-south-1.amazonaws.com/
functions:
  hello: aws-python-http-api-dev-hello (2.4 kB)
https://github.com/serverless/examples/tree/v3/aws-python-http-api

https://www.serverless.com/blog/serverless-python-packaging/

create venv
python -m venv venv

pip install -r requirements.txt

install docker desktop as well
and always run before you work on prject or for next deployment
error: failed with: "ERROR: Invalid requirement: '\x00' (from line 1 of /var/task/requirements.txt)
solution :Open the requirements.txt file in Notepad.
            Click on "File" in the top-left corner of Notepad.
            Click on "Save As" in the dropdown menu that appears.
            In the "Save As" dialog box, click on the "Encoding" dropdown menu.
            Choose "ANSI" from the list of available encoding formats.
            Click on the "Save" button to save the file in the ANSI format.
endpoint: GET - https://cw6rmblwmh.execute-api.ap-south-1.amazonaws.com/price/getPrice
functions:
  hello: aws-python-http-api-dev-hello (71 kB)