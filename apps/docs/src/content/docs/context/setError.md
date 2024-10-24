---
title: setError
description: Function to set the error of a field
sidebar:
  order: 6
---

The `setError` function is used to set the error of a field. It's useful when you want to set an error programmatically, for example, when you want to set an error from a server response.

## Example

```svelte {15}
<script lang="ts">
  import { onMount } from 'svelte';
  import { faivform } from '@tuentyfaiv/svelte-form';

  const form = faivform<Data>({
    // ...config
  });
  const { setError } = $form;

  onMount(async () => {
    try {
      const response = await fetch('https://api.example.com/user');
      const data = await response.json();
    } catch (error) {
      setError('name', 'The user could not be loaded');
    }
  });
</script>
```