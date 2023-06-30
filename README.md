[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Andresr35/Nodejsapps">
  </a>

<h3 align="center">Valtra Inc Automation</h3>

  <p align="center">
    This project automates the tool inventory system in our machine shop. Along with a csv reader from infor that will send shipping updates to shopify through their API. 
    <br />
    <br />
    <br />
    <a href="https://github.com/Andresr35/Nodejsapps">View Demo</a>
    ·
    <a href="https://github.com/Andresr35/Nodejsapps/issues">Report Bug</a>
    ·
    <a href="https://github.com/Andresr35/Nodejsapps/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project




<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![React][React.js]][React-url]
* ![Nodejs][Nodejs]
* ![Express.js][Express.js]
* ![Postgres][Postgres]
* ![Javascript][Javascript]
* ![Azure][Azure]
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
This project will require connections to multiple API's. This includes shopify, azure, your postgres server.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Andresr35/Nodejsapps.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Started with creating a front end with react to hold data 
- [ ] Created a postgres database to hold tool inventory data
- [ ] Connected the database and front end with an express backend
- [ ] Continued to add function and pages to finish the automation project
- [ ] Created a csv reader and parser to send to backend
- [ ] Created a route to accept shipping info updates to send to shopify api wiht graphql




<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andres Ruiz - andres.ruiz3561@gmail.com

Project Link: [https://github.com/Andresr35/Nodejsapps](https://github.com/Andresr35/Nodejsapps)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Andresr35/Nodejsapps.svg?style=for-the-badge
[contributors-url]: https://github.com/Andresr35/Nodejsapps/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Andresr35/Nodejsapps.svg?style=for-the-badge
[forks-url]: https://github.com/Andresr35/Nodejsapps/network/members
[stars-shield]: https://img.shields.io/github/stars/Andresr35/Nodejsapps.svg?style=for-the-badge
[stars-url]: https://github.com/Andresr35/Nodejsapps/stargazers
[issues-shield]: https://img.shields.io/github/issues/Andresr35/Nodejsapps.svg?style=for-the-badge
[issues-url]: https://github.com/Andresr35/Nodejsapps/issues
[license-shield]: https://img.shields.io/github/license/Andresr35/Nodejsapps.svg?style=for-the-badge
[license-url]: https://github.com/Andresr35/Nodejsapps/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/and-r/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Azure]: https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E

# Nodejsapps
PERN stack for Valtra
update test 

# 7/13/2021 
Front end for app 
    Sign in page using microsft azure auth for @stronghandtools accounts 
    PERN stack client(ui) 
    PERN stack server is disabled  

# 7/14/2021 
    SQL server available for ui 
    server/backend still to be implemented 
    small updates to ui 
        update fucntionality fixed 
        version number displayed 
        name of user can be read 
        logo/ favicon changed to Valtra inc logo (looks jank rn)  
        can change database
    discovered deployeing manually from vs code is better than github(ignore aborts for now)  

# 7/19/2022 
    commit 1.0.10 
    server is hooked up onto ui with sql database and api's 
    

