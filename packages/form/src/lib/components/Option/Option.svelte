<svelte:options immutable />

<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/logic/stores/form.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { getStyles } from "$lib/logic/utils/styles.js";
  import { keys } from "$lib/logic/utils/keys.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Option, Props } from "./Option.proptypes.js";

  import "./Option.css";

  type $$Props = Props;

  export let name: Props["name"];
  export let label: Props["label"] = null;
  export let id: Props["id"] = null;
  export let context: Props["context"] = "form";
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let clearOnDestroy: Props["clearOnDestroy"] = false;
  export let options: Props["options"] = [];
  export let styles: Props["styles"] = {};
  // events prepare for svelte 5
  export let onchoose: Props["onchoose"] = undefined;

  // eslint-disable-next-line prefer-const
  let inputs: Record<string, Option> = {};
  let single: string | undefined | null = null;
  let notSingle: string[] = [];

  $: form = useForm<{ [k: string]: string | string[] | undefined | null }>(
    context,
  );
  $: ({ data, errors, styles: ctxStyles, setField } = $form);
  $: ({ option: ctxOptionStyles, replace } = $ctxStyles);

  function onUncheck(
    event: UserEvent<HTMLInputElement, KeyboardEvent | MouseEvent>,
  ) {
    const isKey = event instanceof KeyboardEvent;
    const isMouse = event instanceof MouseEvent;
    const { value } = event.currentTarget;

    const prev: string | undefined | null | string[] = multiple
      ? hasArray<string>($data[name])
      : $data[name];
    const remove = multiple ? prev?.includes(value) : prev === value;
    const empty = multiple ? prev?.length === 0 : !prev;

    if (
      (isKey && event.code === keys.enter) ||
      (isMouse && (remove || empty))
    ) {
      const isArray = multiple && Array.isArray(prev);
      const toRemove = isArray ? prev?.filter((item) => item !== value) : null;
      const toAdd = isArray ? [...prev, value] : value;
      const updated = remove ? toRemove : toAdd;

      setField(name, updated);

      const item = options.find((option) => option.value === value);
      if (updated && item) onchoose?.(item);
    }
  }

  $: if (single || notSingle.length) {
    setField(name, multiple ? notSingle : single);
  }

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "svorm-option-container",
      legend: "svorm-option-legend",
      option: "svorm-option-item",
      label: "svorm-option-label",
      input: "svorm-option-input",
      content: "svorm-option-content",
      error: "svorm-option-error",
    },
    externals: {
      container: styles?.container ?? ctxOptionStyles?.container,
      option: styles?.option ?? ctxOptionStyles?.option,
      label: styles?.label ?? ctxOptionStyles?.label,
      input: styles?.input ?? ctxOptionStyles?.input,
      content: styles?.content ?? ctxOptionStyles?.content,
      error: styles?.error ?? ctxOptionStyles?.error,
    },
  });

  onDestroy(() => {
    if (clearOnDestroy) setField(name, undefined, false);
  });
</script>

{#key form}
  <fieldset class={styls.container} {disabled} {id}>
    <slot>
      {#if label}
        <legend class={styls.legend}>
          {label}
        </legend>
      {/if}
    </slot>
    {#each options as option (option.key ?? `${name}-option-${option.value}`)}
      {@const optionId = option.key ?? `${name}-option-${option.value}`}
      {@const selected = multiple
        ? hasArray($data[name]).includes(option.value)
        : $data[name] === option.value}
      <label
        for={id}
        class={styls.option}
        data-checked={selected}
        title={option.label}
      >
        <slot name="option" {option} id={optionId}>
          {#if option.label}
            <span class={styls.label}>
              {option.label}
            </span>
          {/if}
        </slot>
        {#if multiple}
          <input
            class={styls.input}
            type="checkbox"
            aria-checked={selected}
            id={optionId}
            bind:this={inputs[optionId]}
            bind:group={notSingle}
            on:click|stopPropagation={onUncheck}
            on:keydown|stopPropagation={onUncheck}
            {name}
            value={option.value}
            {...$$restProps}
          />
        {:else}
          <input
            class={styls.input}
            type="radio"
            id={optionId}
            aria-checked={selected}
            bind:this={inputs[optionId]}
            bind:group={single}
            on:click|stopPropagation={onUncheck}
            on:keydown|stopPropagation={onUncheck}
            {name}
            value={option.value}
            {...$$restProps}
          />
        {/if}
        {#if $$slots.content}
          <div class={styls.content}>
            <slot name="content" {option} id={optionId} />
          </div>
        {/if}
      </label>
    {/each}
    {#if $errors[name]}
      <span class={styls.error} transition:fade={{ duration: 200 }}>
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
    {/if}
  </fieldset>
{/key}
