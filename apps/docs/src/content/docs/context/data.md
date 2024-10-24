---
title: $data
description: Form store where you can access the form data
sidebar:
  order: 2
---

The data store is a writable store that contains the values of the fields.

:::note
When you modify directly the data store, the values will not be validated. If you want to validate the values, you should use the [`setField`](/context/setfield) or [`check`](/context/check) methods of the form store.
:::

```svelte {7}
<script lang="ts">
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { data } = $form;

  console.log($data);
</script>
```
