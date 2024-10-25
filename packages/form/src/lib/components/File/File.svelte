<svelte:options immutable />

<script lang="ts">
  import { onDestroy } from "svelte";
  import { X } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/logic/stores/form.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Input, Props } from "./File.proptypes.js";

  import "./File.css";

  type $$Props = Props;

  export let name: Props["name"];
  export let label: Props["label"] =
    "Drag and drop a file here, or click to select a file to upload.";
  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let dragable: Props["dragable"] = true;
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let clearOnDestroy: Props["clearOnDestroy"] = false;
  export let accept: Props["accept"] = "image/*";
  export let max: Props["max"] = Infinity;
  export let styles: Props["styles"] = {};
  // events prepare for svelte 5
  export let onchoose: Props["onchoose"] = undefined;
  export let onremove: Props["onremove"] = undefined;
  // export let onretry: Props["onretry"] = undefined;

  let input: Input;
  let draged = false;

  $: form = useForm<{
    [k: string]: File | Blob | File[] | Blob[] | undefined | null;
  }>(context);
  $: ({ data, errors, styles: ctxStyles, setField, setError } = $form);
  $: ({ file: ctxFileStyles, replace } = $ctxStyles);

  function onSetFiles(toAdd: File | File[]) {
    const updated = multiple
      ? [
          ...hasArray<File>($data[name]),
          ...(toAdd instanceof File ? [toAdd] : toAdd),
        ]
      : toAdd;

    if (updated instanceof File && updated.size > max!) {
      setError(name, "The file is too big");
      return;
    }

    if (Array.isArray(updated) && updated.some(({ size }) => size > max!)) {
      setError(name, "Some files are too big");
      return;
    }

    setField(name, updated);
    onchoose?.(toAdd);
  }

  function onSelectFile({ currentTarget }: UserEvent<HTMLInputElement>) {
    const { files: inputFiles } = currentTarget;
    if (!inputFiles) return;

    onSetFiles(multiple ? [...inputFiles] : inputFiles[0]);
  }

  function onClear() {
    setField(name, null);
    if (input) input.value = "";
  }

  function onRemove(toRemove: File, index: number) {
    if (!multiple) return;

    const updated = hasArray<File>($data[name]).filter(
      (file, i) => `${i}-${file.name}` !== `${index}-${toRemove.name}`,
    );

    setField(name, updated);

    if (updated.length === 0 && input) input.value = "";
  }

  function onDrag(value?: unknown) {
    if (typeof value === "boolean") {
      draged = value;
    } else {
      draged = !draged;
    }
  }

  function onDrop({ dataTransfer }: UserEvent<HTMLLabelElement, DragEvent>) {
    if (!dataTransfer) return;
    const { items } = dataTransfer;

    if (items.length === 0) return;

    let updatedFile: File | null = null;
    if (items[0].kind === "file") {
      updatedFile = items[0].getAsFile();
    }

    const updatedFiles = multiple
      ? [...items].flatMap((item) => {
          if (item.kind === "file") return item.getAsFile() ?? [];
          return [];
        })
      : updatedFile;
    if (!updatedFiles) return;

    onSetFiles(updatedFiles);
  }

  $: many =
    multiple && Array.isArray($data[name]) ? ($data[name] as File[]) : null;
  $: single =
    !multiple && $data[name] instanceof File ? ($data[name] as File) : null;

  $: cover =
    single && single.type.includes("image")
      ? {
          src: URL.createObjectURL(single),
          alt: single.name,
        }
      : null;

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "svorm-file-container",
      cover: "svorm-file-cover",
      remove: "svorm-file-remove",
      items: "svorm-file-items",
      item: "svorm-file-item",
      error: "svorm-file-error",
      // retry: "svorm-file-retry",
      icon: "svorm-file-icon",
      content: "svorm-file-content",
      label: "svorm-file-label",
      input: "svorm-file-input",
    },
    externals: {
      container: styles?.container ?? ctxFileStyles?.container,
      cover: styles?.cover ?? ctxFileStyles?.cover,
      remove: styles?.remove ?? ctxFileStyles?.remove,
      items: styles?.items ?? ctxFileStyles?.items,
      item: styles?.item ?? ctxFileStyles?.item,
      error: styles?.error ?? ctxFileStyles?.error,
      // retry: styles?.retry ?? ctxFileStyles?.retry,
      content: styles?.content ?? ctxFileStyles?.content,
      label: styles?.label ?? ctxFileStyles?.label,
      input: styles?.input ?? ctxFileStyles?.input,
    },
  });

  onDestroy(() => {
    if (clearOnDestroy) onClear();
  });
</script>

{#key form}
  <div class={styls.container}>
    {#if single}
      <div class={styls.item} data-single>
        <slot name="preview" {cover} file={single}>
          {#if cover}
            {@const { src, alt } = cover}
            <img
              {src}
              {alt}
              class={styls.cover}
              loading="lazy"
              decoding="async"
            />
          {:else}
            <span class={styls.cover} data-text>
              <span>{single.name}</span>
            </span>
          {/if}
        </slot>
        <button
          type="button"
          on:click|stopPropagation={() => {
            onremove?.();
            onClear();
          }}
          class={styls.remove}
        >
          <slot name="remove"><X size={20} class={styls.icon} /></slot>
        </button>
      </div>
    {/if}
    {#if many && many.length > 0}
      <div class={styls.items}>
        {#each many as file, index (index)}
          {@const coverItem = file.type.includes("image")
            ? {
                src: URL.createObjectURL(file),
                alt: file.name,
              }
            : null}
          <div class={styls.item}>
            <slot name="preview" cover={coverItem} {file}>
              {#if coverItem}
                <img
                  class={styls.cover}
                  src={coverItem.src}
                  alt={coverItem.alt}
                  loading="lazy"
                  decoding="async"
                />
              {:else}
                <span class={styls.cover} data-text>
                  <span>{file.name}</span>
                </span>
              {/if}
            </slot>
            <button
              type="button"
              class={styls.remove}
              on:click|stopPropagation={() => {
                onremove?.();
                onRemove(file, index);
              }}
            >
              <slot name="remove"><X size={20} class={styls.icon} /></slot>
            </button>
          </div>
        {/each}
      </div>
    {/if}
    <!-- {#if $errors[name] && !single && !multiple}
      <button
        type="button"
        class={styls.retry}
        on:click|stopPropagation={() => {
          onretry?.();
          onClear();
        }}
      >
        <slot name="retry">Retry</slot>
      </button>
    {/if} -->
    {#if !$data[name] || multiple}
      <label
        for={id ?? name}
        class={styls.content}
        data-error={!!$errors[name]}
        class:draged
        aria-disabled={disabled}
        on:dragend|preventDefault={dragable ? () => onDrag(false) : undefined}
        on:dragenter|trusted|preventDefault={dragable ? onDrag : undefined}
        on:dragleave|trusted|preventDefault={dragable ? onDrag : undefined}
        on:dragover|preventDefault={dragable ? () => {} : undefined}
        on:drop|preventDefault={dragable ? onDrop : undefined}
        on:mouseleave|preventDefault={dragable
          ? () => onDrag(false)
          : undefined}
      >
        <input
          bind:this={input}
          id={id ?? name}
          class={styls.input}
          type="file"
          on:change={onSelectFile}
          {multiple}
          {accept}
          {name}
          {disabled}
          {...$$restProps}
        />
        <slot>
          {#if label}
            <span class={styls.label}>
              {label}
            </span>
          {/if}
        </slot>
      </label>
      {#if $errors[name]}
        <span class={styls.error} transition:fade={{ duration: 200 }}>
          <slot name="error" error={$errors[name]}>
            {$errors[name]}
          </slot>
        </span>
      {/if}
    {/if}
  </div>
{/key}
