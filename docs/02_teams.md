# TODO : Create example repositories in examplebank organization. Done for infrastructure, network, security and observability. Do for testing, finops and middleware. Also do for devops tools like apache maven, hashicorp terraform, etc.

# 1. Application Engineering

Responsibilities:
- Add features to application.
- Solve non production environment bugs.

From CI/CD pipeline perspective, there are 3 types of applications:
- Applications which are released to customers so that customers can deploy them to their own environments. 
    - Examples are Windows, Ubuntu, React, Angular, JDK, Kubernetes, Apache Tomcat, Apache Maven, Selenium, Postman, OWASP Zap, etc.
    - Output of the CI/CD pipeline is a release version.
    - Released artifacts are executables, archives, installers, container images and virtual machine images for different operating systems and middlewares.
- Applications which are deployed to production environment
    - Examples are examplebank account, transfer, loan, card, atm, currency, fees microservice application components.
    - Output of the CI/CD pipeline is deployment of application code artifacts to production environment.
    - If customers own the code, the CI pipeline will build and package the code otherwise it will take it from the artifacts released from the first type of applications.
- SaaS Applications which are configured
    - Examples are Salesforce CRM.
    - Output of CI/CD pipeline is deployment of configuration and custom code artifacts to SaaS provider's application endpoints.
    - From the perspective of the SaaS organization, output of CI/CD pipeline is a release version, and for each customer onboarded to the SaaS application, separate instance of the application is deployed to production environment.
<br><br>

# 2. Application Operations
- Solve production problems.
<br><br>

# 3. Testing
- Identify bugs by testing in non production environments.
- Use acceptance criteria to write automated test scripts.
- Create and maintain testing platform which is a set of tools to perform the testing.
- executables, archives, installers, container images and virtual machine images for different operating systems and middlewares for testing tools like postman, jmeter, etc.
<br><br>

# 4. Platform
## 4.1 DevOps
- Build, package and deploy application changes to non production and production environments.
- Create and maintain DevOps platform which is a set of tools to implement DevOps practices to improve speed and quality of software delivery from ideation to feedback.
- executables, archives, installers, container images and virtual machine images for different operating systems and middlewares for DevOps tools like hashicorp terraform, apache maven, etc.
<br><br>

## 4.2 Infrastructure
- Archives, installers, container images and virtual machine images for OS with hardening.
- Patching
<br><br>

### 4.2.1 AWS

<br><br>

### 4.2.2 Azure

<br><br>

### 4.2.3 Google Cloud

<br><br>

## 4.3 Network
- Create and maintain Network platform which manages the network components of the organization.
<br><br>

## 4.4 Security
- Create and maintain Security platform which is a set of tools to implement security practices.
<br><br>

## 4.5 Observability
- Create and maintain Observability platform which is a set of tools to get traces, metrics and logs from applications and other tools and generate alerts, insights and dashboards.
- Example tool is Collector component of OpenTelemetry application of observability organizational unit.
- executables, archives, installers, container images and virtual machine images for different operating systems and middlewares for observability tools.
<br><br>

## 4.6 FinOps
- Create and maintain FinOps platform which is a set of tools to implement cost optimization practices.
<br><br>

## 4.7 Middleware
- Language, Framework, Compute, Storage, Database, Messaging, Runtime, OS
- executables, archives, installers, container images and virtual machine images for different operating systems and middlewares for middleware like apache tomcat, jdk, python, etc.
- Middleware infrastructure like aws eks, aws rds, etc.
<br><br>

# 5. Organizational change management

<br><br>

# 6. Architecture review board

<br><br>

# 7. Customer account management
- In case of applications released as products, liason between customer who has deployed the application or using it as a service and different internal teams.
<br><br>

# Application code repositories for platform tools
- Discovery : 
    - Fill a questionnaire for each application component to collect the data. Then, use the data to make recommendations for the tools of various platforms. 
    - Use GenAI to scan all the application components code repositories and make recommendations for the tools of various platforms.
- Implementation : 
    - Based on the recommendations, we need to create code repositories for these tools in the appropriate organization
    - For example, if recommended middleware tool is apache tomcat because some application components are deployed to apache tomcat as war archives, then we need to create code repository for apache_tomcat application component of apache_tomcat application of middleware organizational unit. 
        - It will have release branches for each major release of apache_tomcat which has been release by apache. 
        - CI/CD pipeline will get the artifacts from apache and create executables, archives, installers, container images and virtual machine images for different operating systems and middlewares.

<br><br>