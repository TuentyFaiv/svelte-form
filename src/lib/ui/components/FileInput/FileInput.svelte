<script lang="ts">
  import { getContext, onMount } from "svelte";

  import type { InputContext } from "$lib/logic/typing/globals.proptypes";
  import type { Input, Props } from "./FileInput.proptypes";

  import * as stylesinternal from "./FileInput.styles";

  export let name: Props["name"];
  export let alt: Props["alt"] = null;
  export let id: Props["id"] = null;
  export let multiple: Props["multiple"] = false;
  export let onSelect: Props["onSelect"] = null;
  export let onRetry: Props["onRetry"] = null;
  export let accept: Props["accept"] = "image/*";
  export let context: Props["context"] = "form";
  export let defaultValue: Props["defaultValue"] = "";
  export let max: Props["max"] = Infinity;
  export let datas: Props["datas"] = {};

  let input: Input;

  const form = getContext<InputContext>(context);
  const {
    data,
    errors,
    styles: { fileinput: styles },
    setField,
    setError,
    t,
  } = $form;

  $: file = !!$data[name] ? ($data[name] as File) : null;
  $: files = !!$data[name] ? ($data[name] as File[]) : null;

  $: image = {
    src: file ? URL.createObjectURL(file) : defaultValue,
    alt: file ? file.name : alt ?? name,
  };

  $: datasets = Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {}
  );

  function onSelectFile(event: Event) {
    const { files: filesToUpload } = event.target as HTMLInputElement;
    if (filesToUpload) {
      const fileToUpload =
        multiple && files
          ? ([...files, ...filesToUpload] as File[])
          : filesToUpload[0];

      if (fileToUpload instanceof File) {
        const sizeKB = fileToUpload.size / 1024;
        if (sizeKB > max) {
          setError(name, "to-big");
        }
      }

      setField(name, fileToUpload);
      onSelect?.(fileToUpload);
    }
  }

  function onClear() {
    setField(name, undefined);
    if (input) input.value = "";
  }

  onMount(() => {
    onClear();
    return () => {
      onClear();
    };
  });
</script>

<div class={styles.wrapper ?? stylesinternal.wrapper} {...datasets}>
  {#if $$slots.out}
    <slot {image} name="out" />
  {/if}
  {#if $$slots.actions && !$errors[name] && !!$data[name]}
    <slot name="actions" {image} {onClear} />
  {/if}
  {#if $errors[name]}
    <div class={styles.actions ?? stylesinternal.actions}>
      <span class={styles.error ?? stylesinternal.error}>
        {t(`forms:${$errors[name]}`)}
      </span>
      <button
        type="button"
        class={styles.retry ?? stylesinternal.retry}
        on:click={() => {
          onRetry?.();
          onClear();
        }}
      >
        {t("forms:try-again")}
      </button>
    </div>
  {/if}
  <label for={id ?? name} class={styles.field ?? stylesinternal.field}>
    {#if !$data[name]}
      <slot name="activate" {image} />
    {/if}
    <input
      bind:this={input}
      id={id ?? name}
      class={styles.input ?? stylesinternal.input}
      type="file"
      {accept}
      on:change={onSelectFile}
      {name}
      {...$$restProps}
    />
  </label>
</div>
