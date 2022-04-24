#Running this script will extract course information from Trinity University's CoSB
#Packages "requests" and "bs4" must be installed before running this script
#Packages can be installed by running "python pip install" from the command line after navigating to your Python folder

import requests
from bs4 import BeautifulSoup
import csv

def departmentScraper (url):
    #takes url for a department or program and extracts the course code, course name, and course description
    
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    courses = soup.find("div", id = "courses")
    #finds the container where the course information is stored

    if courses is not None:
        #if statement to check if the department page held course information
        #without this if statement when there is no information that can be extracted the scraper will crash
        articles = courses.find_all("article", role = "article")
        for article in articles:
            str = article.find("h5", class_ = "mb-3 mt-2 text-black").text.strip().split(" ", 1)
            code = str[0]
            name = str[1]
            description = article.find("div", class_ = "field__item").text
            #extracting course code, course name, and course description

            with open("cosb_Data.csv", 'a', encoding = "utf-8", newline = "") as csvfile:
                csvwriter = csv.writer(csvfile)

                csvwriter.writerow([code, name, description])
                #writing the course code, course name, and course description to the csv file



url = "https://www.trinity.edu/academics/cosb/departments-programs"
#url for the Departments and Programs section of Trinity University's CoSB
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
tables = soup.find_all("div", class_ = "bs_grid")
#returns a list of bs_grid

departmentsTable = tables[0]
programsTable = tables[1]

departments = departmentsTable.find_all("a")
programs = programsTable.find_all("a")
#returns a list of containers that hold the link to each department

biglist = departments + programs
#merge the two lists so we can just one for loop instead of two

with open("cosb_Data.csv", 'a', newline = "") as csvfile:
    csvwriter = csv.writer(csvfile)

    csvwriter.writerow(["Code", "Name", "Description"])
#set up header for the csv file we are writing to

for department in biglist:
    print(department.text)

    href = department["href"].split("/")
    link = ("https://www.trinity.edu/academics/cosb/" + href[-1])
    #extracting necessary information out of the link to pass an url to the department scraper
    departmentScraper(link)

