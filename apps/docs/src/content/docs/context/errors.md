---
title: $errors
description: Form store where you can access the form errors
sidebar:
  order: 2
---

The errors store is a writable store that contains the errors of the fields.

:::note
When you modify directly the errors store, doesn't mean that the field is valid. If you want to validate the values, you should use the [`setField`](/context/setfield) or [`check`](/context/check) methods of the form store.
:::

```svelte {7}
<script lang="ts">
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { errors } = $form;

  console.log($errors);
</script>
```
