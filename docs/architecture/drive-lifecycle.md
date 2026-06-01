# Drive Lifecycle

> 🚧 Not yet drafted. Will land after the state model is agreed in chat.

## What this will cover

- State machine: Unknown → Initialized → Mounted ⇄ Unmounted → Detached → re-Mounted
- What triggers each transition (user actions, drive plug/unplug, init)
- Why mount/unmount is a UI concept, not an OS operation
- How Detached drives are remembered by UUID
- Why drives are identified by UUID rather than by mount path

## Related

- [Requirements → Drive Identity & Management](../requirements/drive-management.md)
- [Architecture index](./README.md)
