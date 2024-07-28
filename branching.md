# Branching Strategy

## Tutorial

| Step | Link | Inputs |
| --- | --- | --- |
| Create branching-demo repository | https://github.com/organizations/devopscodegen/repositories/new | Repository name = `branching-demo`<br> Description = `Branching demo`<br>Visibility = `Public - Anyone on the internet can see this repository. You choose who can commit.`<br>Choose a license : MIT License<br>Click on `Create repository` button |
| Disable Allow merge commits and Allow rebase merging in Pull Requests | https://github.com/devopscodegen/branching-demo/settings | Uncheck `Allow merge commits` and `Allow rebase merging` in Pull Requests section<br>Change `Default commit message` of `Allow squash merging` to `Pull Request title` |
| Create release/0.0 branch from main branch | https://github.com/devopscodegen/branching-demo/branches | Click on New branch button<br>New branch name = `release/0.0`<br>Source = `main`<br>Click on `Create new branch` button |
| Change default branch from main to release/0.0 | https://github.com/devopscodegen/branching-demo/settings | Section = `Default Branch`<br>Click on `Switch to another branch` icon button<br>Select `release/0.0` in Filter branches dropdown<br>Click on `Update` button<br>Click on `I understand, update the default branch.` button |
| Delete main branch | https://github.com/devopscodegen/branching-demo/branches | Click on `Delete` icon button to the right of main branch |
| Create demo.md in release/0.0 branch with below content| https://github.com/devopscodegen/branching-demo/new/release/0.0 | Name your file = `demo.md`<br>Click on `Commit changes...` button<br>Click on `Commit changes` button |

```

|release|feature/bug/problem|commit|
|---|---|---|
```

| Step | Link | Inputs |
| --- | --- | --- |
| Add `protect release branches` ruleset | https://github.com/devopscodegen/branching-demo/settings/rules/new?target=branch | Ruleset Name = `protect release branches`<br>Enforcement status = `Active`<br>Add Target -> Include by pattern<br>Branch naming pattern = `release/*`<br>Click on `Add Inclusion pattern` button<br>Check `Restrict deletions`, `Require linear history`, `Require a pull request before merging`, `Block force pushes` in `Branch protections` in Rules<br>Click on `Create` button |
| Create `release/1.0` milestone | https://github.com/devopscodegen/branching-demo/milestones/new | Title = `release/1.0`<br>Click on `Create milestone` button |
| Create release/1.0 branch from release/0.0 branch | https://github.com/devopscodegen/branching-demo/branches | Click on New branch button<br>New branch name = `release/1.0`<br>Source = `release/0.0`<br>Click on `Create new branch` button |
| Change default branch from release/0.0 to release/1.0 | https://github.com/devopscodegen/branching-demo/settings | Section = `Default Branch`<br>Click on `Switch to another branch` icon button<br>Select `release/1.0` in Filter branches dropdown<br>Click on `Update` button<br>Click on `I understand, update the default branch.` button |
| Add feature label | https://github.com/devopscodegen/branching-demo/labels | Click on `New label` button<br>Label name = `feature`<br>Color = `#0E8A16 (green)`<br>Click on `Create label` button|
| Add problem label | https://github.com/devopscodegen/branching-demo/labels | Click on `New label` button<br>Label name = `problem`<br>Color = `#B60205 (red)`<br>Click on `Create label` button|
| Remove description and change color to blue of bug label | https://github.com/devopscodegen/branching-demo/labels | Click on `Edit` button to the right of bug label<br>Remove `Something isn't working` from Description<br>Change Color to #1D76DB (blue)<br>Click on `Save changes` button|
| Delete all labels except feature, bug and problem | https://github.com/devopscodegen/branching-demo/labels | Click on `Delete` button to the right of all labels except feature, bug and problem<br>Click on OK in `Are you sure? Deleting a label will remove it from all issues and pull requests.` dialog box |
| Create issue for `release/1.0 feature 1` | https://github.com/devopscodegen/branching-demo/issues/new | Add a title = `release/1.0 feature 1`<br>Assignees = `assign yourself`<br>Labels = `feature`<br>Milestone = `release/1.0`<br>Click on `Submit new issue` button |
| Create feature/release_1_0_feature_1 branch from release/1.0 branch for Issue `release/1.0 feature 1` | https://github.com/devopscodegen/branching-demo/issues/1 | Click on `Create a branch` link in Development section<br>New branch name = `feature/release_1_0_feature_1`<br>Click on `Change branch source` link<br>Branch source = `release/1.0`<br>Click on `Create branch` button |
| Create issue for `release/1.0 feature 2` | https://github.com/devopscodegen/branching-demo/issues/new | Add a title = `release/1.0 feature 2`<br>Assignees = `assign yourself`<br>Labels = `feature`<br>Milestone = `release/1.0`<br>Click on `Submit new issue` button |
| Create feature/release_1_0_feature_2 branch from release/1.0 branch for Issue `release/1.0 feature 2` | https://github.com/devopscodegen/branching-demo/issues/2 | Click on `Create a branch` link in Development section<br>New branch name = `feature/release_1_0_feature_2`<br>Click on `Change branch source` link<br>Branch source = `release/1.0`<br>Click on `Create branch` button |
| Make changes to feature/release_1_0_feature_1 branch using following commands | | |

```
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout feature/release_1_0_feature_1
echo "|1.0|feature1|1|" >> demo.md
git add .
git commit -m "release/1.0 feature 1 commit 1"
echo "|1.0|feature1|2|" >> demo.md
git add .
git commit -m "release/1.0 feature 1 commit 2"
git rebase -i HEAD~2
# Change pick to squash for release/1.0 feature 1 commit 2
# Save the rebase instruction with :wq
# Save the combined commit message with :wq
```

| Step | Link | Inputs |
| --- | --- | --- |
| Make changes to feature/release_1_0_feature_2 branch using following commands | | |


```
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout feature/release_1_0_feature_2
echo "|1.0|feature2|1|" >> demo.md
git add .
git commit -m "release/1.0 feature 2 commit 1"
git push
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create pull request from feature/release_1_0_feature_1 branch to release/1.0 branch | https://github.com/devopscodegen/branching-demo/compare/release/1.0...feature/release_1_0_feature_1 | Click on `Create pull request` button<br>Add a title = `release/1.0 feature 1 commits 1 and 2 to release/1.0`<br>Assignees = `Assign yourself`<br>Milestone = `release/1.0`<br>Click on `Create pull request` button |
| Create pull request from feature/release_1_0_feature_2 branch to release/1.0 branch | https://github.com/devopscodegen/branching-demo/compare/release/1.0...feature/release_1_0_feature_2 | Click on `Create pull request` button<br>Add a title = `release/1.0 feature 2 commit 1 to release/1.0`<br>Assignees = `Assign yourself`<br>Milestone = `release/1.0`<br>Click on `Create pull request` button |
| Merge Pull Request `release/1.0 feature 1 commits 1 and 2 to release/1.0` | https://github.com/devopscodegen/branching-demo/pull/3 | Click on `Squash and merge` button<br>Click on `Confirm squash and merge` button |
| Add tag v1.0.1 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout release/1.0
git tag v1.0.1
git push --tags
```

| Step | Link | Inputs |
| --- | --- | --- |
| Merge release/1.0 branch changes to feature/release_1_0_feature_2 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git pull origin release/1.0
git checkout feature/release_1_0_feature_2
git merge release/1.0
```

| Step | Link | Inputs |
| --- | --- | --- |
| Change demo.md file to have following contents | | |

```

|release|feature/bug/problem|commit|
|---|---|---|
|1.0|feature1|1|
|1.0|feature1|2|
|1.0|feature2|1|
```

| Step | Link | Inputs |
| --- | --- | --- |
| Continue the Merge of release/1.0 branch changes to feature/release_1_0_feature_2 using following commands | | |

```
git add .
git commit -m "Resolve merge conflict by incorporating both suggestions"
git push -u origin feature/release_1_0_feature_2
```

| Step | Link | Inputs |
| --- | --- | --- |
| Merge Pull Request `release/1.0 feature 2 commit 1 to release/1.0` | https://github.com/devopscodegen/branching-demo/pull/4 | Click on `Squash and merge` button<br>Click on `Confirm squash and merge` button |
| Add tag v1.0.2 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout release/1.0
git tag v1.0.2
git push --tags
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create issue for `release/1.0 bug 1` | https://github.com/devopscodegen/branching-demo/issues/new | Add a title = `release/1.0 bug 1`<br>Assignees = `assign yourself`<br>Labels = `bug`<br>Milestone = `release/1.0`<br>Click on `Submit new issue` button |
| Create branch bug/release_1_0_bug_1 from tag v1.0.2 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git branch bug/release_1_0_bug_1 v1.0.2
git checkout bug/release_1_0_bug_1
git push --set-upstream origin bug/release_1_0_bug_1
```

| Step | Link | Inputs |
| --- | --- | --- |
| Link bug/release_1_0_bug_1 branch to issue `release/1.0 bug 1` | https://github.com/devopscodegen/branching-demo/issues/5 | Click on gear icon in Development section<br>Select repository devopscodegen/branching-demo<br>Select branch bug/release_1_0_bug_1<br>Click `Apply` button |
| Create release/2.0 milestone | https://github.com/devopscodegen/branching-demo/milestones/new | Title = `release/2.0`<br>Click on `Create milestone` button |
| Create release/2.0 branch from release/1.0 branch | https://github.com/devopscodegen/branching-demo/branches | Click on New branch button<br>New branch name = `release/2.0`<br>Source = `release/1.0`<br>Click on `Create new branch` button |
| Change default branch from release/1.0 to release/2.0 | https://github.com/devopscodegen/branching-demo/settings | Section = `Default Branch`<br>Click on `Switch to another branch` icon button<br>Select `release/2.0` in Filter branches dropdown<br>Click on `Update` button<br>Click on `I understand, update the default branch.` button |
| Create issue for `release/2.0 feature 1` | https://github.com/devopscodegen/branching-demo/issues/new | Add a title = `release/2.0 feature 1`<br>Assignees = `assign yourself`<br>Labels = `feature`<br>Milestone = `release/2.0`<br>Click on `Submit new issue` button |
| Create feature/release_2_0_feature_1 branch from release/2.0 branch for Issue `release/2.0 feature 1` | https://github.com/devopscodegen/branching-demo/issues/6 | Click on `Create a branch` link in Development section<br>New branch name = `feature/release_2_0_feature_1`<br>Click on `Change branch source` link<br>Branch source = `release/2.0`<br>Click on `Create branch` button |
| Make changes to feature/release_2_0_feature_1 branch using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout feature/release_2_0_feature_1
echo "|2.0|feature1|1|" >> demo.md
git add .
git commit -m "release/2.0 feature 1 commit 1"
git push
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create pull request from feature/release_2_0_feature_1 branch to release/2.0 branch | https://github.com/devopscodegen/branching-demo/compare/release/2.0...feature/release_2_0_feature_1 | Click on `Create pull request` button<br>Add a title = `release/2.0 feature 1 commit 1 to release/2.0`<br>Assignees = `Assign yourself`<br>Milestone = `release/2.0`<br>Click on `Create pull request` button |
| Merge Pull Request `release/2.0 feature 1 commit 1 to release/2.0` | https://github.com/devopscodegen/branching-demo/pull/7 | Click on `Squash and merge` button<br>Click on `Confirm squash and merge` button |
| Add tag v2.0.1 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout release/2.0
git tag v2.0.1
git push --tags
```

| Step | Link | Inputs |
| --- | --- | --- |
| Make changes to bug/release_1_0_bug_1 branch using following commands | | |


```
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout bug/release_1_0_bug_1
echo "|1.0|bug1|1|" >> demo.md
git add .
git commit -m "release/1.0 bug 1 commit 1"
git push
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create pull request from bug/release_1_0_bug_1 branch to release/1.0 branch | https://github.com/devopscodegen/branching-demo/compare/release/1.0...bug/release_1_0_bug_1 | Click on `Create pull request` button<br>Add a title = `release/1.0 bug 1 commit 1 to release/1.0`<br>Assignees = `Assign yourself`<br>Milestone = `release/1.0`<br>Click on `Create pull request` button |
| Merge Pull Request `release/1.0 bug 1 commit 1 to release/1.0` | https://github.com/devopscodegen/branching-demo/pull/8 | Click on `Squash and merge` button<br>Click on `Confirm squash and merge` button |
| Add tag v1.0.3 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout release/1.0
git tag v1.0.3
git push --tags
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create branch merge/tag_v_1_0_3_to_release_2_0 from tag v1.0.3 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git branch merge/tag_v_1_0_3_to_release_2_0 v1.0.3
git checkout merge/tag_v_1_0_3_to_release_2_0
git push --set-upstream origin merge/tag_v_1_0_3_to_release_2_0
```

| Step | Link | Inputs |
| --- | --- | --- |
| Create pull request from merge/tag_v_1_0_3_to_release_2_0 branch to release/2.0 branch | https://github.com/devopscodegen/branching-demo/compare/release/2.0...merge/tag_v_1_0_3_to_release_2_0 | Click on `Create pull request` button<br>Add a title = `Merge tag v1.0.3 to release/2.0`<br>Assignees = `Assign yourself`<br>Milestone = `release/2.0`<br>Click on `Create pull request` button |
| Merge release/2.0 branch changes to merge/tag_v_1_0_3_to_release_2_0 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git pull origin release/2.0
git checkout merge/tag_v_1_0_3_to_release_2_0
git merge release/2.0
```

| Step | Link | Inputs |
| --- | --- | --- |
| Change demo.md file to have following contents | | |

```

|release|feature/bug/problem|commit|
|---|---|---|
|1.0|feature1|1|
|1.0|feature1|2|
|1.0|feature2|1|
|1.0|bug1|1|
|2.0|feature1|1|
```

| Step | Link | Inputs |
| --- | --- | --- |
| Continue the Merge of release/2.0 branch changes to merge/tag_v_1_0_3_to_release_2_0 using following commands | | |

```
git add .
git commit -m "Resolve merge conflict by incorporating both suggestions"
git push -u origin merge/tag_v_1_0_3_to_release_2_0
```

| Step | Link | Inputs |
| --- | --- | --- |
| Merge Pull Request `Merge tag v1.0.3 to release/2.0` | https://github.com/devopscodegen/branching-demo/pull/9 | Click on `Squash and merge` button<br>Click on `Confirm squash and merge` button<br>Click on `Delete branch` button |
| Add tag v2.0.2 using following commands | | |

```
rm -rf /tmp/branching-demo
cd /tmp && git clone https://github.com/devopscodegen/branching-demo.git
cd branching-demo
git checkout release/2.0
git tag v2.0.2
git push --tags
```