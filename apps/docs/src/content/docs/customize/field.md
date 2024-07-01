---
title: Individual
description: Customize the look and feel of the fields one by one.
sidebar:
  order: 3
---

You can customize the look and feel of the fields one by one using the `styles` property in each built-in component. Depending on the component you can customize different properties.

:::note
The individual customization has priority over the global and form customization.
:::

## Field

To know the properties that you can customize in the `Field` component you can check the [`FieldStyles`](/reference/#fieldstyles).

```svelte
<script lang="ts">
  import { Field } from "@tuentyfaiv/svelte-form";

  import type { FieldStyles } from "@tuentyfaiv/svelte-form";

  const styles: FieldStyles = {
    // ... class names
  };
</script>

<Field {styles} name="some-field" />
```

## Select

To know the properties that you can customize in the `Select` component you can check the [`SelectStyles`](/reference/#selectstyles).

```svelte
<script lang="ts">
  import { Select } from "@tuentyfaiv/svelte-form";

  import type { SelectStyles } from "@tuentyfaiv/svelte-form";

  const styles: SelectStyles = {
    // ... class names
  };
</script>

<Select {styles} name="some-select" />
```

## Option

To know the properties that you can customize in the `Option` component you can check the [`OptionStyles`](/reference/#optionstyles).

```svelte
<script lang="ts">
  import { Option } from "@tuentyfaiv/svelte-form";

  import type { OptionStyles } from "@tuentyfaiv/svelte-form";

  const styles: OptionStyles = {
    // ... class names
  };
</script>

<Option {styles} name="some-option" />
```

## File

To know the properties that you can customize in the `File` component you can check the [`FileStyles`](/reference/#filestyles).

```svelte
<script lang="ts">
  import { File } from "@tuentyfaiv/svelte-form";

  import type { FileStyles } from "@tuentyfaiv/svelte-form";

  const styles: FileStyles = {
    // ... class names
  };
</script>

<File {styles} name="some-file" />
```

## Errors

To know the properties that you can customize in the `Errors` component you can check the [`ErrorsStyles`](/reference/#errorsstyles).

```svelte
<script lang="ts">
  import { Errors } from "@tuentyfaiv/svelte-form";

  import type { ErrorsStyles } from "@tuentyfaiv/svelte-form";

  const styles: ErrorsStyles = {
    // ... class names
  };
</script>

<Errors {styles} />
```
