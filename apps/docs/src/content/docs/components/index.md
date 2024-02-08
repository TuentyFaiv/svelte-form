---
title: Built-in components
description: These are the components that come with this library
sidebar:
  order: 1
---

This library comes with a set of components that you can use to build your own forms. These components are built using the same API that you have access to, so you can use them as a reference for your own components.

Here is a simple overview of the components that come with this library:


## [Field](/components/field)

The most basic component, usefull for inputs like text, number, email, etc.

```svelte
<script>
  import { Field } from '@tuentyfaiv/svelte-form';
</script>

<Field name="name" label="Name" />
```

## [Select](/components/select)

Usefull for select inputs, it can be single or multiple.

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

## [Option](/components/option)

Usefull for radio input for single options or checkbox for multiple options.

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

## [File](/components/file)

Usefull for file inputs, it can be single or multiple and dropzone is supported.

```svelte
<script>
  import { File } from '@tuentyfaiv/svelte-form';
</script>

<File name="file" />
```

## [Errors](/components/errors)

Usefull for displaying errors from the form.

```svelte
<script>
  import { Errors } from '@tuentyfaiv/svelte-form';
</script>

<Errors />
```

## Comming soon

:::note
The following components are not yet implemented, but they are planned to be implemented in the future.
:::

- ### Color

  Usefull for color inputs.


- ### Date

  Usefull for date, datetime-local, month, time and week inputs.

- ### Date

  Usefull for date range inputs.


- ### Range

  Usefull for range inputs.