import sys
import re
from functools import wraps
from time import sleep
from datetime import datetime, time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
from selenium.webdriver.common.alert import Alert
from shutil import move, copymode,make_archive
import zipfile
import subprocess
from datetime import date


opt = Options()
opt.add_experimental_option("debuggerAddress",f"localhost:8989")
opt.add_argument('--headless')
opt.add_argument('--disable-gpu')

try:
    driver = webdriver.Chrome(executable_path=r"C:\Program Files\chromedriver.exe",options=opt)
except Exception:
    from webdriver_manager.chrome import ChromeDriverManager
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=opt)

# driver.implicitly_wait(5)


def GetVar(path,line):
    with open(r"{0}".format(path), 'r') as fp:
        content = fp.readlines()[line]
        fp.close()
    return content

def tab(n):
    tn = driver.window_handles[n]
    driver.switch_to.window(tn)

def Wait(xpth):
    return WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, xpth)))

def wait_until_height(driver, xpath, intialiser, timeout=10):
    def height_reached(driver):
        element = driver.find_element(by=By.XPATH,value=xpath)
        k = element.get_attribute('data-testid')!=f"fruitjuice-{intialiser}-button"
        print(k)
        return k

    return WebDriverWait(driver, timeout).until(height_reached)


def findxpth(xpath):
    try:
        return driver.find_element(by=By.XPATH,value=xpath)
    except Exception:
        pass


def wrreplace(cpth, search_text, replace_text):
    with open(cpth, 'r+') as f:
        file = f.read()
        file = re.sub(search_text, replace_text, file, 1)
        f.seek(0)
        f.write(file)
        f.truncate()


def Write(filenme,cont):  # Updating the vars and Slots
    with open(filenme, 'a', encoding='utf-8') as f:
        try:
            f.write(f'{cont}')
        except:
            pass
        f.close()

def Write2(cont):  # Updating the vars and Slots
    with open('not_found.csv', 'a', encoding='utf-8') as f:
        try:
            f.write(f'{cont}')
        except:
            pass
        f.close()


def wait(xpth):  # Selenium wait method
    return WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, xpth)))



def check_execution_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = datetime.now()  # Get the start time
        # /html/body/div[1]/div[1]/div/main/div[1]/div[1]/div/div/div/div/div[9]/div/div/div[2]/div[2]/div[2]/div/span/button
        # Execute the wrapped function
        result = func(*args, **kwargs)
        
        end_time = datetime.now()    # Get the end time
        execution_time = end_time - start_time  # Calculate the execution time
        
        # Print the execution time
        print(f"Execution time: {execution_time}")
        
        return result
    
    return wrapper

if __name__ == "__main__":
    k = driver.find_elements(By.XPATH, '/html/body/div[1]/div[1]/div/main/div[1]/div[1]/div/div/div/div')

    # Count the number of child elements
    num_children = len(k[0].find_elements(By.XPATH, './*'))

    print("Number of child elements:", num_children)