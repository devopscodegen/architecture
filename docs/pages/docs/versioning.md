# Semantic versioning

## Summary
https://semver.org

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes

MINOR version when you add functionality in a backward compatible manner

PATCH version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
<br/>

## Recommendation
Recommended to use for versioning common libraries or frameworks on which application components are dependant on.

Application components import functions and classes from these libraries or frameworks and call these functions using fixed parameters and return values. 

If these libraries or frameworks remove these functions, they increment the major version. 

If these libraries or frameworks add or remove parameters to these functions in a backward compatible manner, then they increment the minor version.

For example : 
- Our application component was using _app_ctx_stack object of flask python framework to get the current application context.
- We used pip requirement version specifier flask>=2.0.0,<3.0.0 in our requirements.txt file.
- _app_ctx_stack object was deprecated in version 2.2.0 and removed in version 3.0.0. Major version was incremented from 2 to 3 because _app_ctx_stack object was removed and hence any application component code that is using this _app_ctx_stack object would break.
- But because we used pip requirement version specifier flask>=2.0.0,<3.0.0, pip did not upgrade flask to version 3.0.0 and hence our application component did not break even though we are still using _app_ctx_stack object.

Many open source libraries and frameworks use semantic versioning.

It is better to use contract testing instead of relying on semantic versioning when we make incompatible API changes between  application components like changes to the REST api.
<br/><br/>

# 2. Calendar versioning

## Summary
https://calver.org

## Recommendation
Recommended to use for versioning operating systems and middleware on which application components are deployed to.

These operating systems and middleware have only 1 release per year and have many long-term support (LTS) releases. 

They do not provide functions that are imported by application components. Instead, application components are deployed to them.

For example :
- Ubuntu derives additional benefit from its CalVer scheme, by integrating it with their support schedule. 
- Ubuntu currently has five-year support periods for their long-term support (LTS) releases, and only 9 months for non-LTS releases. 
- Thanks to CalVer and elementary arithmetic, any user can easily determine whether their version is still supported. The current LTS release at the time of writing, 16.04, will be supported until April 2021.
<br/><br/>

# Release versioning ( Recommended for application components )
## Versions
```
<MAJOR version>.<MINOR version>.<PATCH version>
[-
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release MAJOR version>.<pre-release MINOR version>.<pre-release PATCH version>
]
[+
    <CI/CD pipeline build number>.<CI/CD pipeline build timestamp>
]
```
<br/>

## Summary
Given a version number MAJOR.MINOR.PATCH,:

Increment the MAJOR version by 1 for creating each release.

Set the MINOR version to an appropriate value if we want to create a new release between 2 already created releases.

Increment the PATCH version by 1 every time a pull request is merged to the release branch.

CI/CD pipeline runs once for each version number MAJOR.MINOR.PATCH

Every time, we increment MAJOR version, we reset MINOR and PATCH versions to 0.

Every time, we increment MINOR version, we keep MAJOR version the same and reset PATCH version to 0.
<br/>

## Examples

For release 1.0 of the software application component which is planned to be deployed to production on Friday 5th July 2024, 
- Versions are 1.0.0, 1.0.1, 1.0.2, 1.0.3 and so on. 
- Any one of these versions will be deployed to production.

For release 2.0 of the software application component which is planned to be deployed to production on Friday 2nd August 2024, 
- We increment the MAJOR version from 1 to 2
- Reset the MINOR and PATCH versions to 0
- Therefore, versions are 2.0.0, 2.0.1, 2.0.2, 2.0.3 and so on. 
- Any one of these versions will be deployed to production.

After releases 1.0 and 2.0 are created, if we decide that a new release needs to be deployed to production on Friday 19th July 2024 between the production release dates of releases 1.0 and releases 2.0, then
- We keep the MAJOR version same at 1
- Increment the MINOR version from 0 to 100. We increment from 0 to 100 instead of 0 to 1 so that if more releases need to be deployed between release 1.0 and 1.100, we can accomodate them in our versioning design.
- Reset the PATCH version to 0
- Therefore, versions are 1.100.0, 1.100.1, 1.100.2, 1.100.3 and so on. 
- Any one of these versions will be deployed to production.

After releases 1.0, 2.0 and release 1.100 are created, if we decide that a new release needs to be deployed to production on Friday 12th July 2024 between the production release dates of releases 1.0 and 1.100, then
- We keep the MAJOR version same at 1
- We set MINOR version to 50 which is halfway between 0 to 100.
- Reset the PATCH version to 0
- Therefore, versions are 1.50.0, 1.50.1, 1.50.2, 1.50.3 and so on. 
- Any one of these versions will be deployed to production.
<br/>

## Optional versions

### Pre-release version
```
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release MAJOR version>.<pre-release MINOR version>.<pre-release PATCH version>
```
### CI/CD pipeline build number
- Jenkins CI/CD pipeline build number
### Build timestamp
- Jenkins CI/CD pipeline build timestamp
```date +%Y%m%d%H%M%S```
- For example : 20240726155537
<br/>

## Sets of testing environments
We will have 3 sets of testing environments - current, next and future. Each release ```<MAJOR version>.<MINOR version>``` of each application component will be tagged to a particular set of testing environments so that CI/CD pipeline knows to which set of testing environments, it needs to deploy the build artifact. 

| Date | Application component | Deployment frequency | SDLC | Production deployment status | Production deployment date | Version | Testing environment set |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Deployed | Saturday 27 July 2024 | 1.0 | Current |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 31 August 2024 | 2.0 | Next |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 28 September 2024 | 3.0 | Future |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Deployed | Friday 9 August 2024 | 1.0 | Current |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 16 August 2024 | 2.0 | Next |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 23 August 2024 | 3.0 | Future |

<br/>On Tuesday 13 August 2024, If we need to make a change in both application components, then we can test it in Next set of testing environments. 
- In that case, we need to make the change in 1.0 of #1 and 2.0 of #2. But release 2.0 of #2 will go to production on 16 August and release 1.0 of #1 will go to production on 31 August. 
- So if our change in #2 requires the change in #1, then there is a problem. 
- In this case, we need to use feature toggles to make the change in 2.0 of #2 and 1.0 of #1 and test it but keep the feature toggle disabled. 
- We need to enable the feature toggle in both 1.0 of #1 and 2.0 of #2 using hotfix after 31st August after 1.0 of #1 goes into production and both are pointing to the current set of testing environment. 
- When enabling the feature toggle, we need to test it in current set of testing environments.
- Better approach is to have same deployment frequency and SDLC methodology for all application components. ( If we just do this for related application components and new relation is added in the future, we will have to make this change then which can be problematic so better to do it for all at once ). Difficult to achieve if we have SaaS products who have their own deployment frequency / release cycle.
<br/>

## Recommendation
Recommended to use for application components.

Application components do not import the classes and functions of other application components instead they communicate using APIs. So we dont need to use semantic versioning.

Application components have releases once every day, once every week, once every 2 weeks, once every 3 weeks, once every month or once every quarter. They dont have one release per year and long term support releases. So we dont need to use calendar versioning.

It is better to use release versioning and contract testing instead of relying on semantic versioning when making incompatible API changes between application components like changes to the REST api, event, etc.
<br/><br/>

# 4. Release calendar versioning 

## Not recommended
Release calendar versioning is similar to release versioning except that we can use the version number to identify when the release is planned to goto production.

The planned date may change due to unforeseen circumstances.

Also, we sometimes maintain multiple releases at the same time. For example, Kubernetes has release 27,28,29 and 30 being released at the same time every few weeks. Some customers have deployed Kubernetes release 27 while others have deployed release 30.

So, it is better to just use Release versioning instead of Release calendar versioning and instead map the Release number to Release planned production date in a release management tool.
<br/><br/>

## Production deployment frequencies ( Release cycles )
| Frequencies | Version representation |
| --- | --- |
| Once a quarter | MAJOR version ```<year in 4 digits><month in 2 digits>``` |
| Once a month | MAJOR version ```<year in 4 digits><month in 2 digits>``` |
| Once every 3 weeks | MINOR version ```<day in 1 or 2 digits>``` |
| Once every 2 weeks | MINOR version ```<day in 1 or 2 digits>``` |
| Once a week | MINOR version ```<day in 1 or 2 digits>``` |
| Once a day | MINOR version ```<day in 1 or 2 digits>``` |
| Once every hour or every X hours | Currently we cannot finish development and testing in 1 hour or in X hours |
- If CI/CD pipeline does not deploy the tested build artifact on the planned date mentioned in the ```<MAJOR version>.<MINOR version>``` due to some issue like bad weather, then also it is fine. It is just a planned date so that by just looking at the version number of the tested build artifact or release branch name ```release/<MAJOR version>.<MINOR version>```, we can identify when the particular tested build artifact is planned to deployed to production.
- MAJOR version covers waterfall sdlc and MINOR version covers agile sdlc.
- We have only 12 possible MAJOR versions each year, so it does not change frequently. For example : 202401, 202402, 202403 ... 202412.
- If application component #1 uses waterfall sdlc and is deployed to production once a month and its next production deployment is planned on Saturday 31 August 2024, then all versions of the tested build artifact will start with 202408.31.
- If application component #2 uses agile sdlc and is deployed to production once every 2 weeks and its next production deployment is planned on Friday 9 August 2024, then all versions of the tested build artifact will start with 202408.9.
- Since the MAJOR version of both application components is same, we can consider 202408.9. as a mini release of 202408.31.
<br/>

## Versions
```
<MAJOR version>.<MINOR version>.<PATCH version>
[-
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release MAJOR version>.<pre-release MINOR version>.<pre-release PATCH version>
]
[+
    <CI/CD pipeline build number>.<CI/CD pipeline build timestamp>
]
```

## MAJOR version
```<year in 4 digits><month in 2 digits>```
- Year and month on which it has been planned than CI/CD pipeline will deploy tested build artifact to production. 
- Example 1 : For a 1 week sprint starting from Monday 29 July 2024 and ending on Friday 2 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 2 August 2024, then MAJOR version is 202408
- Example 2 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 9 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 9 August 2024, then MAJOR version is 202408
- Example 3 : For a quarterly release starting from Monday 1 July 2024 and ending on Saturday 28 September 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Saturday 28 September 2024, then MAJOR version is 202409
<br/>

## MINOR version
```<day in 1 or 2 digits>```
- Day on which CI/CD pipeline will deploy tested build artifact to production.
- Example 1 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 2 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 2 August 2024, then MINOR version is 2
- Example 2 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 9 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 9 August 2024, then MINOR version is 9
- Example 3 : For a quarterly release starting from Monday 1 July 2024 and ending on Saturday 28 September 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Saturday 28 September 2024, then MINOR version is 28
<br/>

## PATCH version
- Incremented on every pull request merge to ```release/<MAJOR version>.<MINOR version>``` branch
<br/>

## Pre-release version [ Optional ]
```
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release MAJOR version>.<pre-release MINOR version>.<pre-release PATCH version>
```

## CI/CD pipeline build number [ Optional ]
- Jenkins CI/CD pipeline build number
<br/>

## Build timestamp [ Optional ]
- Jenkins CI/CD pipeline build timestamp
```date +%Y%m%d%H%M%S```
- For example : 20240726155537
<br/>

## Examples
- 202408.2.1
- 202408.2.1-alpha.1
- 202408.2.1-beta.1
- 202408.2.1-0.0.5
- 202408.2.1+5.20240726155537
- 202408.2.1-alpha.1+5.20240726155537
<br/>

## Sets of testing environments
We will have 3 sets of testing environments - current, next and future. Each release ```<MAJOR version>.<MINOR version>``` of each application component will be tagged to a particular set of testing environments so that CI/CD pipeline knows to which set of testing environments, it needs to deploy the build artifact. 

| Date | Application component | Deployment frequency | SDLC | Production deployment status | Production deployment date | Version | Testing environment set |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Deployed | Saturday 27 July 2024 | 202407.27 | Current |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 31 August 2024 | 202408.31 | Next |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 28 September 2024 | 202409.28 | Future |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Deployed | Friday 9 August 2024 | 202408.9 | Current |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 16 August 2024 | 202408.16 | Next |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 23 August 2024 | 202408.23 | Future |

<br/>On Tuesday 13 August 2024, If we need to make a change in both application components, then we can test it in Next set of testing environments. 
- In that case, we need to make the change in 202408.31 of #1 and 202408.16 of #2. But #2 will go to production on 16 August and #1 will goto production on 31 August. 
- So if our change in #2 requires the change in #1, there is a problem. 
- In this case, we need to use feature toggles to make the change in 202408.16 of #2 and 202408.31 of #1 and test it but keep the feature toggle disabled. 
- We need to enable the feature toggle in both 202408.31 of #1 and 202408.16 of #2 using hotfix after 31st August after 202408.31 of #1 goes into production and both are pointing to the current set of testing environment. 
- When enabling the feature toggle, we need to test it in current set of testing environments.
- Better approach is to have same deployment frequency and SDLC methodology for all application components. ( If we just do this for related application components and new relation is added in the future, we will have to make this change then which can be problematic so better to do it for all at once ). Difficult to achieve if we have SaaS products who have their own deployment frequency / release cycle.
