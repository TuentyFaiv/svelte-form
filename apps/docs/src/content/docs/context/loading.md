---
title: $loading
description: Form store where you can see if the form is loading or not
sidebar:
  order: 3
---

The loading store is writable store that indicates whether the form is submitting or not.

:::note
When you modify directly the loading store, doesn't mean that the form is submitting. If you want to submit the form, you should use the [`submit`](/context/submit) method of the form store.
:::

```svelte {7}
<script lang="ts">
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { loading } = $form;

  console.log($loading);
</script>
```