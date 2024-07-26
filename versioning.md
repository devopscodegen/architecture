## Production deployment frequencies ( Release cycles )
| Frequencies | Version representation |
| --- | --- |
| Once a quarter | major version ```<year in 4 digits><month in 2 digits>``` |
| Once a month | major version ```<year in 4 digits><month in 2 digits>``` |
| Once every 3 weeks | minor version ```<day in 1 or 2 digits>``` |
| Once every 2 weeks | minor version ```<day in 1 or 2 digits>``` |
| Once a week | minor version ```<day in 1 or 2 digits>``` |
| Once a day | minor version ```<day in 1 or 2 digits>``` |
| Once every hour or every X hours | Currently we cannot finish development and testing in 1 hour or in X hours |
- If CI/CD pipeline does not deploy the tested build artifact on the planned date mentioned in the ```<major version>.<minor version>``` due to some issue like bad weather, then also it is fine. It is just a planned date so that by just looking at the version number of the tested build artifact or release branch name ```release/<major version>.<minor version>```, we can identify when the particular tested build artifact is planned to deployed to production.
- Major version covers waterfall sdlc and minor version covers agile sdlc.
- We have only 12 possible major versions each year, so it does not change frequently. For example : 202401, 202402, 202403 ... 202412.
- If application component #1 uses waterfall sdlc and is deployed to production once a month and its next production deployment is planned on Saturday 31 August 2024, then all versions of the tested build artifact will start with 202408.31.
- If application component #2 uses agile sdlc and is deployed to production once every 2 weeks and its next production deployment is planned on Friday 9 August 2024, then all versions of the tested build artifact will start with 202408.9.
- Since the major version of both application components is same, we can consider 202408.9. as a mini release of 202408.31.
<BR>

## Versions
```
<major version>.<minor version>.<patch version>
[-
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release major version>.<pre-release minor version>.<pre-release patch version>
]
[+
    <CI/CD pipeline build number>.<CI/CD pipeline build timestamp>
]
```

## Major version
```<year in 4 digits><month in 2 digits>```
- Year and month on which it has been planned than CI/CD pipeline will deploy tested build artifact to production. 
- Example 1 : For a 1 week sprint starting from Monday 29 July 2024 and ending on Friday 2 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 2 August 2024, then major version is 202408
- Example 2 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 9 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 9 August 2024, then major version is 202408
- Example 3 : For a quarterly release starting from Monday 1 July 2024 and ending on Saturday 28 September 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Saturday 28 September 2024, then major version is 202409
<BR>

## Minor version
```<day in 1 or 2 digits>```
- Day on which CI/CD pipeline will deploy tested build artifact to production.
- Example 1 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 2 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 2 August 2024, then minor version is 2
- Example 2 : For a 2 week sprint starting from Monday 29 July 2024 and ending on Friday 9 August 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Friday 9 August 2024, then minor version is 9
- Example 3 : For a quarterly release starting from Monday 1 July 2024 and ending on Saturday 28 September 2024, if it has been planned that CI/CD pipeline will deploy tested build artifact to production on Saturday 28 September 2024, then minor version is 28
<BR>

## Patch version
- Incremented on every pull request merge to ```release/<major version>.<minor version>``` branch
<BR>

## Pre-release version [ Optional ]
```
    <alpha OR beta OR gamma OR stable>.<pre-release version>
    OR <pre-release major version>.<pre-release minor version>.<pre-release patch version>
```

## CI/CD pipeline build number [ Optional ]
- Jenkins CI/CD pipeline build number
<BR>

## Build timestamp [ Optional ]
- Jenkins CI/CD pipeline build timestamp
```date +%Y%m%d%H%M%S```
- For example : 20240726155537
<BR>

## Examples
- 202408.2.1
- 202408.2.1-alpha.1
- 202408.2.1-beta.1
- 202408.2.1-0.0.5
- 202408.2.1+5.20240726155537
- 202408.2.1-alpha.1+5.20240726155537
<BR>

## Sets of testing environments
We will have 3 sets of testing environments - current, next and future. Each release ```<major version>.<minor version>``` of each application component will be tagged to a particular set of testing environments so that CI/CD pipeline knows to which set of testing environments, it needs to deploy the build artifact. 

| Date | Application component | Deployment frequency | SDLC | Production deployment status | Production deployment date | Version | Testing environment set |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Deployed | Saturday 27 July 2024 | 202407.27 | Current |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 31 August 2024 | 202408.31 | Next |
| Tuesday 13 August 2024 | #1 | Once a month | Waterfall | Planned | Saturday 28 September 2024 | 202409.28 | Future |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Deployed | Friday 9 August 2024 | 202408.9 | Current |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 23 August 2024 | 202408.23 | Next |
| Tuesday 13 August 2024 | #2 | Once every 2 weeks | Agile | Planned | Friday 6 September 2024 | 202409.6 | Future |

<BR>If we need to make a change in both application components, then we can test it in Next set of testing environments. 
- In that case, we need to make the change in 202408.31 of #1 and 202408.23 of #2. But #2 will go to production on 23 August and #1 will goto production on 31 August. 
- So our change in #2 requires the change in #1, there is a problem. 
- In this case, we need to use feature toggles to make the change in 202408.23 of #2 and 202408.31 of #1 and test it but keep the feature toggle disabled. 
- We need to enable the feature toggle in both 202408.31 of #1 and 202408.23 of #2 using hotfix after 31st August after 202408.31 of #1 goes into production and both are pointing to the current set of testing environment. 
- When enabling the feature toggle, we need to test it in current set of testing environments.
- Better approach is to have same deployment frequency and SDLC methodology for all application components. ( If we just do this for related application components and new relation is added in the future, we will have to make this change then which can be problematic so better to do it for all at once ). Difficult to achieve if we have SaaS products who have their own deployment frequency / release cycle.
