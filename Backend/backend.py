from flask import Flask, request, jsonify # type: ignore
from all_imports import *

app = Flask(__name__)

@app.route("/send_prompt", methods=["POST"])
def send_prompt():
    data = request.get_json()
    prompt = data.get("prompt")
    output_data = sendPrompt(prompt)  # Call your existing function with the prompt
    return jsonify({"output_data": output_data})



@check_execution_time
def sendPrompt(promt):
    print(driver.title)
    if 'Continue' not in promt and 'np' not in promt:
        promt = f'{promt}, explain in two lines'

    # for i in range(3):
    #     if i>0:
    #         promt = 'continue two more lines'
    element = driver.find_element(by=By.XPATH,value=f'//*[@id="prompt-textarea"]')
    element.send_keys(promt)
    try:
        driver.find_element(by=By.XPATH,value=f'/html/body/div[1]/div[1]/div/main/div[1]/div[2]/div[1]/div/form/div/div[2]/div/button').click()
    except Exception:
        driver.find_element(by=By.XPATH,value=f'//*[@id="__next"]/div[1]/div/main/div[1]/div[2]/div[1]/div/form/div/div[2]/div/div/button').click()
    print("[:] Getting response...")
    sleep(2)
    wait_until_height(driver, "//*[@id='__next']/div[1]/div/main/div[1]/div[2]/div[1]/div/form/div/div[2]/div/div/button","stop")
    sleep(1)
    k = driver.find_elements(By.XPATH, '/html/body/div[1]/div[1]/div/main/div[1]/div[1]/div/div/div/div')
    num_children = len(k[0].find_elements(By.XPATH, './*'))
    k = driver.find_element(by=By.XPATH,value=f'/html/body/div[1]/div[1]/div/main/div[1]/div[1]/div/div/div/div/div[{num_children}]/div/div/div[2]/div/div[1]/div/div')
    recentMsg1 = k.get_attribute('innerText')
    return (recentMsg1)

if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask app in debug mode for development
        
        