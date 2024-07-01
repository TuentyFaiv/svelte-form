---
title: Forms
description: Customize the look and feel of the forms.
sidebar:
  order: 2
---

Instead of using the global configuration to customize the look and feel of the forms, you can use the `styles` property in the `faivform` function. You can check the properties that you can customize in the [`ContextStyles`](/reference/#contextstyles).

:::note
The styles property has priority over the global configuration but not over the individual configuration.
:::

## Usage

```svelte
<script lang="ts">
  import { faivform } from "@tuentyfaiv/svelte-form";

  const form = faivform({
    // ... schema or adapter and context name
    styles: {},
  });
</script>
```