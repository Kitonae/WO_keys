---
title: "Remote File Access"
---


## Remote File Access

<!-- STUB: This article should cover the remote file browsing and access system, including the allow list mechanism for securing remote file operations. -->

### Content to include

- **What remote file access is** — explain that WATCHOUT allows Producer to browse and upload files to remote nodes over the network, enabling centralized management of distributed playback systems.
- **File browser** — how to open the file browser dialog, browse directory roots, navigate folders, and select files/folders on a remote node.
- **Allow list configuration** — the security mechanism that restricts which directories on a remote node can be accessed. Explain:
  - The `allow_list.json` file and its location.
  - The JSON format for specifying allowed folders.
  - That access is granted to subfolders of allowed paths.
  - The requirement to restart Producer (and WATCHOUT Manager) after changes.
- **When remote access is required** — uploading assets to remote nodes, configuring asset watcher paths on remote machines, and browsing for startup show files.
- **Error handling** — the "Remote file browsing is not allowed" error and how to resolve it by updating the allow list.
- **Security considerations** — why the allow list exists and recommendations for limiting access to necessary directories only.
