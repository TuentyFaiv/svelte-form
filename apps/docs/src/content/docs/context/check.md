---
title: check
description: Function to validate the value of an input field
sidebar:
  order: 7
---

The `check` function is usefull to set and validate the value of an custom component using an input or textarea element.

## Example

```svelte {12}
<script lang="ts">
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { check } = $form;
</script>

<label class={$styles.container}>
  <span class={$styles.label}>
  <input class={$styles.input} on:input={check} on:blur={check} />
</label>
```