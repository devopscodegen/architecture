# Conglomerate ( Group of companies )

A conglomerate is a corporation made up of several different, independent businesses.

In a conglomerate, one company owns a controlling stake in smaller companies that each conduct business operations separately.

Conglomerates can be created in several ways, including mergers or acquisitions.

The parent company can cut back the risks of being in a single market by becoming a conglomerate diversified across several industry sectors.
<br><br>

# Company

A company is a legal entity formed by a group of individuals to engage in and operate a business enterprise in a commercial or industrial capacity.

A Conglomerate contains many companies.
<br><br>

# Organization
Organization includes schools, nonprofits, and government customers in addition to companies and conglomerates.
<br><br>

# Organizational unit
An organization can be divided into multiple organizational units using combinations of below
- Divide the organization based on the specialization of its workforce.
    - For example : divide the organization into departments consisting of marketing, sales, and operations.
- Divide the organization geographically
    - For example : NA (North America), EMEA (Europe, Middle East and Africa), APAC (Australia and Asia Pacific)
- Divide the organization based on the products, projects, or subsidiaries it operates.
    - For example : Divide telecommunication provider into mobile prepaid, mobile postpaid, broadband internet, etc. units

One example of an organizational unit is North America sales. 

Another example is APAC broadband internet.

As you can see, we have divided the organization using multiple criteria to create organizational units.

Every organization decides the criteria and how to divide the organization into organizational units.
<br><br>

# Software application

Manual work done by employees of each organizational unit has been migrated to software applications.

These software applications belonging to one organizational unit are deployed to the same production environment and use one set/cluster/group/fleet of testing environments per release.

One set/cluster/group/fleet of testing environments is used for Release 1 which is currently in production and another set/cluster/group/fleet of testing environments is used for Release 2 which is being currently developed and so on.
<br><br>

# Software Application Component

A software application contains multiple software application components.

Each software application component has 
- Internal architecture like monolith, microservice, etc.
- External architecture which defines how it is deployed and how it interacts with other software application components.

Multiple types
- Multiple releases tested in sets/clusters/groups/fleets of testing environments and being supported at the same time. Different releases may be deployed to production environments of different organizational units.
    - Example 1 : Kubernetes has releases 27, 28, 29 and 30 released at the same time. HR organizational unit may be using Kubernetes cluster with release 29 and Marketing organizational unit may have already upgraded to release 30. New developments are happening in release 31 which was released in alpha pre release but currently is in beta pre release. 31 will be released when all kubernetes clusters have upgraded from 27 to 28, 29 or 30.
    - Example 2 : Ubuntu has releases 24.04, 22.04, 20,04, 23.10, 18.04, 16.04 and 14.06 currently supported. Some VMs of HR organizational unit may be using Ubuntu 22.04 while some may still be using Ubuntu 18.04.
- One release deployed to production and supported. One release being developed and will be deployed to production on next release date.
- SaaS applications are upgraded automatically by the SaaS team. We need to maintain releases of the configuration and customizations.
<br><br>

# Types of software application components
| Type | Description |
| --- | --- |
| Web Frontend | React, Angular, SPA, Microfrontend, HTML, CSS, Javascript |
| Mobile App | Android, iOS |
| Desktop App | Electron |
| Backend | Java, Python, Javascript, Spring, Django, Express, NodeJS |
| Data Ingestion and Transformation | Python, Pyspark, Spark |
| BI Reports and Dashboards | PowerBI |
| Embedded / IoT | |
| Robotics | |
| Generative AI | Langchain, Llamaindex |
| Non-Generative AI | |
| SaaS Applications Configuration and Customization | Salesforce |
| Integration | Mulesoft |
| BPM | Bizagi |
| Automation Scripts | InfraOps, CloudOps, NetOps - Python, Shell scripting | 
<br><br>

# Software application components dependencies
Software application components import functions and classes from Libraries / Frameworks and call them using defined parameters and return values.

Software application components are deployed to and use middlewares like language runtimes, databases, messaging, caching, etc.

Middlewares are deployed to Operating Systems.

Operating Systems are installed on Servers.

Servers are deployed to data centers, private clouds and public clouds.
<br><br>

# DevOps
- Each software application component will have its own source code repository, devops code repository, CI/CD pipeline and artifact repositories.
- In addition to the above, from devops perspective, we need to create one devops code repository, CI/CD pipeline and artifact repositories for each of the below 
    - OS and/or middleware combination base images.
    - Common public cloud and private cloud infrastructure code, configuration and secrets of all software application components of each organizational unit.
<br><br>

# FAQs

## What is a set/cluster/group/fleet of testing environments ?
Each set/cluster/group/fleet of testing environments contains the following testing environments
- One simulated testing environment with separate namespace for each application component.
- One end to end testing environment.
- One performance testing environment.
- One relability, chaos engineering and disaster recovery testing environment.
- One deployment strategy and rollback testing environment.
<br>

## Why cannot we deploy all software application components of an organization to the same production environment ?
Datacenters and public cloud accounts have hard limits on how many resources can be deployed to them. Therefore, we need to divide the deployment of software application components of an organization to multiple production environments. We could have one production environment per software application. This architecture will be more secure but less cost effective. So, it is better to have one production environment per organizational unit. All software application components of the software applications of the organizational unit are deployed to it.
<br>

## 