---
title: reset
description: Function to reset the form
sidebar:
  order: 9
---

The `reset` function is used to reset the form. It's useful when you want to reset the form programmatically, for example, when you want to reset the form from a button click.

:::note
You can pass two arguments to the `reset` function. The first argument is to remove all errors from the form, and the second argument is to set the fields to their initial values.
:::

## Example

```svelte {10}
<script lang="ts">
  import { faviform } from '@tuentyfaiv/svelte-form';

  const form = faviform<Data>({
    // ...config
  });
  const { reset } = $form;
</script>

<button on:click={() => reset()}>Reset form</button>
```