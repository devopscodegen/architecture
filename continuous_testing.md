## Unit testing
### Features
- Using libraries and code, we are simulating middleware in addition to producer/upstream application components.
- All tests are running in the same process and we dont use any other process like docker containers, postgresql databases, etc.
- We are running this testing before creating container images, helm charts, etc. so we are not testing devops code like container image code, deployment code, etc.
- Automated tests run in the testing container of the CI/CD pipeline.
### Testing data
<BR>

## Simulated testing
### Features
- We are running this testing after creating container images, helm charts, etc. so we are testing devops code like container image code, deployment code, database code, etc.
- We are using actual middleware and simulating the producer/upstream application components using mocks.
- Automated tests run in the testing namespace for version release.subrelease.patch of the application component which contains all middleware and simulated producer/upstream application components running as containers.
- In simulated testing, we have tested using simulated producer/upstream application components. 
- In contract testing, we add actual producer/upstream application components to check if our simulated assumptions are correct since contracts and mocks should be same.
- In end to end testing, we are checking if adding this application component to consumer application components is causing bugs or not.
### Testing data
<BR>

## End to end testing
### Features
- We need to test the user and system journeys which can involve many apis of many application components.
    - For example
        - One journey is give loan 1 of 5 USD from lender account 2 to new borrower. 
            - POST /api/v1/loan/1
        - But open account 2 and credit 5 USD to account 2 is also required in order to give this loan as part of this journey.
            - POST /api/v1/account/2
            - POST /api/v1/account/2/credit
- As explained in contract testing section, we can deploy to end to end testing environment, only if contract testing for all consumer contracts of this application component in all producer/upstream application components are successful.
- Automated tests run in the environment namespace which contains all application components and cloud middleware.
- Since we are using cloud middleware instead of middleware containers (simulated testing), we are testing infrastucture code as well. 
### Testing data
<BR>

## Contract testing
### Features
- Consumer contracts used for contract testing should be same as Producer/Upstream mocks used for simulated testing.
- It includes not only validating the request and response fields of api calls but also validation of request and response data.
- If the request and response fields of api calls or request and response data for simulated testing changes, then need to update the contracts as well.
- Ideally, unit test code will change, then mocks will change and then consumer contracts will change.
- Before deploying the application component to end to end testing environment
    - We should run contract testing and check if consumer contracts from this application component to all producers/upstream application components are successful. These contracts should be same as the producer/upstream mocks used in simulated testing.
    - If yes, then only, we should deploy and run the end to end testing. If end to end testing fails, then bug is in the consumer application component since the contract testing is successful and the contracts are same as the producer/upstream mocks used in simulated testing.
    - If no, then need to wait and keep retrying till the contract testing is successful. Once it is successful, then only we need to deploy and run end to end testing. If end to end testing fails, then bug is in the consumer application component since the contract testing is successful and the contracts are same as the producer/upstream mocks used in simulated testing.
- Separate environment is not required for contract testing. It is done in end to end testing environment before deployment.
### Testing data
<BR>

## Performance testing
### Features
### Testing data
<BR>

## Security scans
### Features
### Testing data
<BR>

## Reliability/Chaos engineering testing
### Features
### Testing data
<BR>

## Deployment strategy testing
### Features
- Blue green
- Canary
- Linear
### Testing data
<BR>

## Rollback testing
### Features
- Database
- Files
- Code
- Producer/Upstream application components
- Rollback strategy similar to deployment strategy - Gradual/One shot 
### Testing data
<BR>

## Notes
- https://www.techtarget.com/searchsecurity/news/366596579/CrowdStrike-Content-validation-bug-led-to-global-outage
<BR>

## Crowdstrike global outage preliminary Post Incident Review
This is CrowdStrike’s preliminary Post Incident Review (PIR). We will be detailing our full investigation in the forthcoming Root Cause Analysis that will be released publicly. Throughout this PIR, we have used generalized terminology to describe the Falcon platform for improved readability. Terminology in other documentation may be more specific and technical.

### What Happened?

On Friday, July 19, 2024 at 04:09 UTC, as part of regular operations, CrowdStrike released a content configuration update for the Windows sensor to gather telemetry on possible novel threat techniques.

These updates are a regular part of the dynamic protection mechanisms of the Falcon platform. The problematic Rapid Response Content configuration update resulted in a Windows system crash.

Systems in scope include Windows hosts running sensor version 7.11 and above that were online between Friday, July 19, 2024 04:09 UTC and Friday, July 19, 2024 05:27 UTC and received the update. Mac and Linux hosts were not impacted.

The defect in the content update was reverted on Friday, July 19, 2024 at 05:27 UTC. Systems coming online after this time, or that did not connect during the window, were not impacted.

### What Went Wrong and Why?

CrowdStrike delivers security content configuration updates to our sensors in two ways: Sensor Content that is shipped with our sensor directly, and Rapid Response Content that is designed to respond to the changing threat landscape at operational speed.

The issue on Friday involved a Rapid Response Content update with an undetected error.

Sensor Content
Sensor Content provides a wide range of capabilities to assist in adversary response. It is always part of a sensor release and not dynamically updated from the cloud. Sensor Content includes on-sensor AI and machine learning models, and comprises code written expressly to deliver longer-term, reusable capabilities for CrowdStrike’s threat detection engineers.

These capabilities include Template Types, which have pre-defined fields for threat detection engineers to leverage in Rapid Response Content. Template Types are expressed in code. All Sensor Content, including Template Types, go through an extensive QA process, which includes automated testing, manual testing, validation and rollout steps.

The sensor release process begins with automated testing, both prior to and after merging into our code base. This includes unit testing, integration testing, performance testing and stress testing. This culminates in a staged sensor rollout process that starts with dogfooding internally at CrowdStrike, followed by early adopters. It is then made generally available to customers. Customers then have the option of selecting which parts of their fleet should install the latest sensor release (‘N’), or one version older (‘N-1’) or two versions older (‘N-2’) through Sensor Update Policies.

The event of Friday, July 19, 2024 was not triggered by Sensor Content, which is only delivered with the release of an updated Falcon sensor. Customers have complete control over the deployment of the sensor — which includes Sensor Content and Template Types.
Rapid Response Content
Rapid Response Content is used to perform a variety of behavioral pattern-matching operations on the sensor using a highly optimized engine. Rapid Response Content is a representation of fields and values, with associated filtering. This Rapid Response Content is stored in a proprietary binary file that contains configuration data. It is not code or a kernel driver.

Rapid Response Content is delivered as “Template Instances,” which are instantiations of a given Template Type. Each Template Instance maps to specific behaviors for the sensor to observe, detect or prevent. Template Instances have a set of fields that can be configured to match the desired behavior.

In other words, Template Types represent a sensor capability that enables new telemetry and detection, and their runtime behavior is configured dynamically by the Template Instance (i.e., Rapid Response Content).

Rapid Response Content provides visibility and detections on the sensor without requiring sensor code changes. This capability is used by threat detection engineers to gather telemetry, identify indicators of adversary behavior and perform detections and preventions. Rapid Response Content is behavioral heuristics, separate and distinct from CrowdStrike’s on-sensor AI prevention and detection capabilities.

Rapid Response Content Testing and Deployment
Rapid Response Content is delivered as content configuration updates to the Falcon sensor. There are three primary systems: the Content Configuration System, the Content Interpreter and the Sensor Detection Engine.

The Content Configuration System is part of the Falcon platform in the cloud, while the Content Interpreter and Sensor Detection Engine are components of the Falcon sensor. The Content Configuration System is used to create Template Instances, which are validated and deployed to the sensor through a mechanism called Channel Files. The sensor stores and updates its content configuration data through Channel Files, which are written to disk on the host.

The Content Interpreter on the sensor reads the Channel File and interprets the Rapid Response Content, enabling the Sensor Detection Engine to observe, detect or prevent malicious activity, depending on the customer’s policy configuration. The Content Interpreter is designed to gracefully handle exceptions from potentially problematic content.

Newly released Template Types are stress tested across many aspects, such as resource utilization, system performance impact and event volume. For each Template Type, a specific Template Instance is used to stress test the Template Type by matching against any possible value of the associated data fields to identify adverse system interactions.

Template Instances are created and configured through the use of the Content Configuration System, which includes the Content Validator that performs validation checks on the content before it is published.

Timeline of Events: Testing and Rollout of the InterProcessCommunication (IPC) Template Type
Sensor Content Release: On February 28, 2024, sensor 7.11 was made generally available to customers, introducing a new IPC Template Type to detect novel attack techniques that abuse Named Pipes. This release followed all Sensor Content testing procedures outlined above in the Sensor Content section.

Template Type Stress Testing: On March 05, 2024, a stress test of the IPC Template Type was executed in our staging environment, which consists of a variety of operating systems and workloads. The IPC Template Type passed the stress test and was validated for use.

Template Instance Release via Channel File 291: On March 05, 2024, following the successful stress test, an IPC Template Instance was released to production as part of a content configuration update. Subsequently, three additional IPC Template Instances were deployed between April 8, 2024 and April 24, 2024. These Template Instances performed as expected in production.

What Happened on July 19, 2024?
On July 19, 2024, two additional IPC Template Instances were deployed. Due to a bug in the Content Validator, one of the two Template Instances passed validation despite containing problematic content data.

Based on the testing performed before the initial deployment of the Template Type (on March 05, 2024), trust in the checks performed in the Content Validator, and previous successful IPC Template Instance deployments, these instances were deployed into production.

When received by the sensor and loaded into the Content Interpreter, problematic content in Channel File 291 resulted in an out-of-bounds memory read triggering an exception. This unexpected exception could not be gracefully handled, resulting in a Windows operating system crash (BSOD).

### How Do We Prevent This From Happening Again?

Software Resiliency and Testing
Improve Rapid Response Content testing by using testing types such as:
Local developer testing
Content update and rollback testing
Stress testing, fuzzing and fault injection
Stability testing
Content interface testing
Add additional validation checks to the Content Validator for Rapid Response Content. A new check is in process to guard against this type of problematic content from being deployed in the future.
Enhance existing error handling in the Content Interpreter.
 

Rapid Response Content Deployment
Implement a staggered deployment strategy for Rapid Response Content in which updates are gradually deployed to larger portions of the sensor base, starting with a canary deployment.
Improve monitoring for both sensor and system performance, collecting feedback during Rapid Response Content deployment to guide a phased rollout.
Provide customers with greater control over the delivery of Rapid Response Content updates by allowing granular selection of when and where these updates are deployed.
Provide content update details via release notes, which customers can subscribe to.
 

Updated 2024-07-24 2217 UTC
Third Party Validation

Conduct multiple independent third-party security code reviews.
Conduct independent reviews of end-to-end quality processes from development through deployment.
In addition to this preliminary Post Incident Review, CrowdStrike is committed to publicly releasing the full Root Cause Analysis once the investigation is complete.
