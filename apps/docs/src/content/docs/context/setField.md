---
title: setField
description: Function to set and validate the value of a field
sidebar:
  order: 5
---

The `setField` function is used to set the value of a field. By default it will validate the value of the field, but you can disable the validation by passing `false` as the third argument.

:::tip
You can use this function to set a value programmatically, for example, when you want to set the value of a field from a server response.
:::

## Example

```svelte {13}
<script lang="ts">
  import { onMount } from 'svelte';
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { setField } = $form;

  onMount(async () => {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    setField('name', data.name);
  });
</script>
```