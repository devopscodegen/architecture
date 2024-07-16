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

bug may be associated with multiple features. So we need bug issue and branch.
problem may be associated with multiple features. So we need problem issue and branch.
PR is getting update with next commits. So better to create release/1.0.1 Frozen Branch for every PR merge to release/1.0 branch. Patch number can be incremented or it can be the PR number. Better to increment because PR numbers will continue to rise in the future as number of releases increases.
for each created milestone release/X.X, release branch release/X.X is created.
for each created feature, bug and problem issue, feature, bug and problem branch needs to be created.
bug and problem are related to PR which has unique branch release/X.X.X from which to create it.
Create PR only to next release branch. Then when that PR is merged to next release branch, PR will be created to merge to future release branch from next release branch. This way, changes done in next release branch for the PR merge can be reused for future release branch.

- https://github.com/organizations/devopscodegen/repositories/new
    - Repository name : branching-strategy-demo
    - Description : Branching strategy demo
    - Radio button - Public checkbox
    - Dropdown - Choose a license : MIT License
    - Button - Create repository
- https://github.com/devopscodegen/branching-strategy-demo/branches
    - Button - New branch
    - New branch name - release/0.0
    - Dropdown - Source : main
- https://github.com/devopscodegen/branching-strategy-demo/settings
    - Section : Default Branch
    - Button : Switch to another branch
    - Dropdown : release/0.0
    - Button : Update
    - Button : I understand, update the default branch.
- https://github.com/devopscodegen/branching-strategy-demo/branches
    - For main branch, Button : delete
- Create empty demo.txt in release/0.0 branch.
- https://github.com/devopscodegen/branching-strategy-demo/milestones/new
    - Title : release/1.0
    - Button - Create milestone
    - Automatically create release/1.0 branch from release/0.0 branch
- https://github.com/devopscodegen/branching-strategy-demo/labels
    - Button - New label
    - Label name - feature
    - Color - green
- https://github.com/devopscodegen/branching-strategy-demo/labels
    - Button - New label
    - Label name - problem
    - Color - red
- https://github.com/devopscodegen/branching-strategy-demo/labels
    - bug label edit - Remove description
    - change color to blue
- https://github.com/devopscodegen/branching-strategy-demo/labels
    - delete all labels except feature, bug and problem.
- https://github.com/devopscodegen/branching-strategy-demo/issues/new
    - Add a title : feature 1 of release/1.0
    - Assignees : assign yourself
    - Labels : feature
    - Milestone : release/1.0
    - Button - Submit new issue
    - Automatically create feature/feature_1_of_release_1_0 branch from release/1.0 branch
- https://github.com/devopscodegen/branching-strategy-demo/issues/1
    - Development : Connect feature/feature_1_of_release_1_0 branch to issue
- https://github.com/devopscodegen/branching-strategy-demo/issues/new
    - Add a title : feature 2 of release/1.0
    - Assignees : assign yourself
    - Labels : feature
    - Milestone : release/1.0
    - Button - Submit new issue
    - Automatically create feature/feature_2_of_release_1_0 branch from release/1.0 branch
- https://github.com/devopscodegen/branching-strategy-demo/issues/2
    - Development : Connect feature/feature_2_of_release_1_0 branch to issue
