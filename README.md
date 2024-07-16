# Branching Strategy

## Glossary
| Term | Description |
| --- | --- |
| Repository | Github repository for storing code |
| Project management application | Jira |
| Project | Software development project.<br>Created by project lead in project management application.<br>Issues of type feature, bug and problem are created in it.<br>Example : jira scrum software project. |
| Release | Created by release manager in release management application.<br>Release management application automatically creates release/ branch for each release (see Higher releases Term for more information).<br>Feature issues are scoped to release.<br>Example : release 1, release 2.<br>Multiple releases can be active at one time which is true for os and middleware application components.<br>Example : kubernetes has 4 active releases 27, 28, 29 and 30. |
| Release date | Each release has a scheduled date to be released to customers or production.|
| Feature | Feature is scoped to a release.<br>Feature issue is created in project by project lead.<br>Project management application automatically creates feature/<feature issue number> branch.<br>Developer checks out this branch and pushes changes to it.<br>Every day, developer needs to create pull request from feature/<feature issue number> branch to release/ branch and merge it for continuous integration.<br>Once all features scoped to the release are merged, release is ready for release.<br>Features are of below types<br>- Functional<br>- Operational excellence (devops, readability, maintainability)<br>- Security (vulnerabilities)<br>- Reliability (disaster recovery, high availability)<br>- Performance efficiency (load balancing)<br>- Cost optimization|
| Problem | After all testing is successful, CI/CD pipeline waits for manual approval before deploying to production or releasing to customers.<br>Once release manager provides this approval, it is deployed to production or released to customers and a tag named released/<timestamp> is added to the release/ branch and feature issues are updated as closed for release/.<br>Once this type of released/<timestamp> tag is added to the release/ branch, no feature issues can be created in project and no feature branches can be created.<br>For any issues identified after this point in time, a problem issue is created in project.<br>Project management application automatically creates problem/<problem issue number> branch.<br>Developer checks out this branch and pushes changes to it.<br>Once fix is ready, developer needs to create pull request from problem/<problem issue number> branch to release/ branch and merge it.<br>After all testing is successful, CI/CD pipeline waits for manual approval before deploying to production or releasing to customers.<br>Once release manager provides this approval, it is deployed to production or released to customers and a tag named released/<timestamp> is added to the release/ branch and problem issues are updated as closed for release/.<br>Problems are of below types<br>- Functional<br>- Operational excellence (devops, readability, maintainability)<br>- Security (vulnerabilities)<br>- Reliability (disaster recovery, high availability)<br>- Performance efficiency (load balancing)<br>- Cost optimization|
| Bug | When CI/CD pipeline runs automated testing of different types - pre-deployment security scanning, contract testing, simulated testing, integration testing, end to end testing, performance testing, post-deployment security scanning, etc.<br>If CI/CD pipeline fails, bug issue is created in project.<br>Developers make changes to feature/ branch before release or problem/ branch after release and create PR from feature/ or problem/ branch to release branch.<br>If all testing is successful, then the bug issue is closed.<br>CI/CD pipeline may do testing in parallel for some environments, so multiple bug/ issues may be created one for each environment where testing failed.|
| Pre release | Once all features are developed and we want the customers to provide feedback, release manager can add pre-released/<timestamp> tag.<br>Based on customer feedback, bug issues can be created in project.<br>Once all bugs are fixed, then release manager can add released/<timestamp> tag.<br>Once this type of released/<timestamp> tag is added to the release/ branch, no feature issues can be created in project and no feature branches can be created.<br>For any issues identified after this point in time, a problem issue is created in project.
| Higher releases | For next release, new release/ branch is created from latest pre-released/<timestamp> or released/<timestamp> tag of previous release.<br>For every existing (after the latest pre-released/<timestamp> or released/<timestamp> tag) or new pull request merged to previous release/ branches, a PR is created to this release/ branch.<br>Project issue is updated with this PR information and project issue cannot be closed until these PRs are merged and CI/CD pipeline completes automated testing.<br>Example: If feature/ or problem/ is merged to release/1.0, automatic PR is created from merge commit of feature/ or problem/ -> release/1.0 to release/2.0 and release/3.0. This is linked to the feature or problem issue in the project and feature or problem issue cannot be closed until these PRs are merged and CI/CD pipeline completes automated testing for them.<br>If CI/CD pipeline fails, bug issue is created in project. |
| branch | No main branch.<br>3 types of branches - feature/<feature issue number>, problem/<problem issue number>, release/1.0.<br>All branches are created automatically by project management and release management applications.|