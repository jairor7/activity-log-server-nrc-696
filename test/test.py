from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
url = 'http://localhost:5000/login'
driver.get(url)
time.sleep(2)

def login_user_success():
  input_username = driver.find_element(By.ID, 'username')
  input_password = driver.find_element(By.ID, 'password')
  button_login = driver.find_element(By.ID, 'login-user')

  input_username.send_keys('jairo123')
  time.sleep(2)
  input_password.send_keys('1223')
  time.sleep(2)
  button_login.click()
  time.sleep(3)
  have_span_error = driver.find_element(By.CLASS_NAME, 'span-error').is_displayed()
  if have_span_error:
    input_password.clear()
    input_password.send_keys('123')
    time.sleep(2)
    button_login.click()
  register_activity()

def register_activity():
  time.sleep(2)
  tab_register_activity = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/main/div/div[1]/div[1]/div/div[2]')
  tab_register_activity.click()
  time.sleep(1)

  input_activity = driver.find_element(By.ID, 'activity')
  input_description = driver.find_element(By.ID, 'description')
  input_time = driver.find_element(By.ID, 'time')
  input_date = driver.find_element(By.ID, 'date')

  button_register_activity = driver.find_element(By.XPATH, '//*[@id="rc-tabs-0-panel-2"]/div/form/button')
  button_register_activity.click()
  time.sleep(2)

  have_span_error = driver.find_element(By.CLASS_NAME, 'span-error').is_displayed()
  if have_span_error:
    input_activity.send_keys('Actividad 6')
    time.sleep(2)
    input_description.send_keys('Actividad de ejemplo 6')
    time.sleep(2)
    input_time.send_keys('6 minutos')
    time.sleep(2)
    input_date.send_keys('2024')
    time.sleep(2)
    button_date_today = driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div/div/div[2]/ul/li/a')
    button_date_today.click()
    time.sleep(2)
    button_register_activity.click()
    time.sleep(3)
    button_register_activity = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/main/div/div[1]/div[1]/div/div[1]')
    button_register_activity.click()
    time.sleep(5)

login_user_success()