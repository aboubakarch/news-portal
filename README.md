# News App Assessment

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Local Development](#local-development)
  - [Using Docker](#using-docker)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher): Download and install from [Node.js official website](https://nodejs.org/).
- **npm** (v9.x or higher): Comes with Node.js. You can check the version by running `npm -v`.
- **Docker** (optional): Download and install from [Docker official website](https://www.docker.com/).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   ```

2. **Install packages:**
   ```bash
   yarn install
   npm install
   ```

## Running the Project

# Local Development

```bash
yarn start
npm install
```

# Using Docker

```bash
    docker build -t news-app .
    docker run -p 3000:80 news-app
```
