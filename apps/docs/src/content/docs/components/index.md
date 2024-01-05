---
title: Built-in components
description: These are the components that come with this library
sidebar:
  order: 1
---

This library comes with a set of components that you can use to build your own forms. These components are built using the same API that you have access to, so you can use them as a reference for your own components.


## Field

The `Field` component is the most basic component. To see the full explanation of it, check the [Field component](/components/field) page.
Here is a quick example of how to use it:

```svelte
<script>
  import { Field } from '@tuentyfaiv/svelte-form';
</script>

<Field name="name" label="Name" />

```

## Select

The `Select` component is used to render a select input. To see the full explanation of it, check the [Select component](/components/select) page.
Here is a quick example of how to use it:

```svelte
<script>
  import { Select } from '@tuentyfaiv/svelte-form';

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
</script>

<Select name="number" label="Name" {options} />

```

## Option

The `Option` component is used to render a list of options. To see the full explanation of it, check the [Option component](/components/option) page.
Here is a quick example of how to use it:

```svelte
<script>
  import { Option } from '@tuentyfaiv/svelte-form';

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
</script>

<Option name="type" label="Name" {options} />

```

## File

The `File` component is used to render a file input. To see the full explanation of it, check the [File component](/components/file) page.
Here is a quick example of how to use it:

```svelte
<script>
  import { File } from '@tuentyfaiv/svelte-form';
</script>

<File name="file" />

```

## Errors

The `Errors` component is used to render the form errors. To see the full explanation of it, check the [Errors component](/components/errors) page.
Here is a quick example of how to use it:

```svelte
<script>
  import { Errors } from '@tuentyfaiv/svelte-form';
</script>

<Errors />

```