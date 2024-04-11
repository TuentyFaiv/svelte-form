<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/logic/stores/form.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { getStyles } from "$lib/logic/utils/styles.js";
  import { keys } from "$lib/logic/utils/keys.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Events, Option, Props } from "./Option.proptypes.js";

  type $$Props = Props;

  export let name: Props["name"];
  export let label: Props["label"] = null;
  export let id: Props["id"] = null;
  export let context: Props["context"] = "form";
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let options: Props["options"] = [];
  export let styles: Props["styles"] = {};
  export let datas: Props["datas"] = {};

  let inputs: Record<string, Option> = {};
  let single: string | undefined | null = null;
  let notSingle: string[] = [];

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField } = $form);
  $: ({ option: ctxOptionStyles, replace } = $ctxStyles);

  function onChoose(value: string) {
    dispatch("choose", value);
  }

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

      if (updated) onChoose(value);
    }
  }

  $: if (single || notSingle.length) {
    setField(name, multiple ? notSingle : single);
  }

  $: datasets = generateDatas(datas);

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "faivform-option-container",
      legend: "faivform-option-legend",
      option: "faivform-option-item",
      label: "faivform-option-label",
      input: "faivform-option-input",
      content: "faivform-option-content",
      error: "faivform-option-error",
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
    setField(name, undefined, false);
  });
</script>

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
    <label
      for={id}
      class={styls.option}
      data-checked={multiple
        ? hasArray($data[name]).includes(option.value)
        : $data[name] === option.value}
      title={option.label}
      {...datasets}
    >
      <slot name="option" {option} id={optionId}>
        {#if option.label}
          <p class={styls.label}>
            {option.label}
          </p>
        {/if}
      </slot>
      {#if multiple}
        <input
          class={styls.input}
          type="checkbox"
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

<style>
  :global(.faivform-option-container) {
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    border: none;
    gap: calc(var(--faivform-space) / 2);
    z-index: 0;
  }
  :global(.faivform-option-container:is(:disabled)) {
    filter: grayscale(1) opacity(0.5);
    cursor: not-allowed;
  }
  :global(.faivform-option-container:is(:disabled) > *) {
    pointer-events: none;
  }
  :global(.faivform-option-item) {
    position: relative;
    display: block;
    box-sizing: inherit;
    flex: 1;
    width: 100%;
    min-width: fit-content(150px);
    min-width: 150px;
    background-color: var(--faivform-placeholder-color);
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    border-radius: var(--faivform-radius);
    border: var(--faivform-border-base);
    border-color: rgb(var(--faivform-placeholder-900) / 1);
    transition: background-color 200ms linear;
    will-change: background-color;
    z-index: 0;
  }
  :global(.dark .faivform-option-item),
  :global([data-theme="dark"] .faivform-option-item) {
    border-color: rgb(var(--faivform-placeholder-50) / 1);
  }
  :global(.faivform-option-item:not([data-checked="true"]):is(:hover)) {
    cursor: pointer;
    border-color: var(--faivform-secondary-color);
    outline: var(--faivform-border-base);
    outline-color: var(--faivform-secondary-color);
  }
  :global(.faivform-option-item:is([data-checked="true"])) {
    background-color: var(--faivform-primary-color);
    border-color: var(--faivform-primary-color);
  }
  :global(
      .faivform-option-item:is([data-checked="true"]) .faivform-option-label
    ) {
    color: rgb(var(--faivform-white) / 1);
    font-weight: 500;
  }
  :global(
      .dark
        .faivform-option-item:is([data-checked="true"])
        .faivform-option-label
    ),
  :global(
      [data-theme="dark"]
        .faivform-option-item:is([data-checked="true"])
        .faivform-option-label
    ) {
    color: rgb(var(--faivform-primary-900) / 1);
  }
  :global(
      .faivform-option-item:is([data-checked="false"])
        .faivform-option-input:is(:focus, :focus-visible)
    ) {
    outline-color: var(--faivform-secondary-color);
  }
  :global(.faivform-option-legend) {
    display: block;
    width: 100%;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    margin-bottom: calc(var(--faivform-space) / 4);
    color: var(--faivform-primary-text);
    font-size: var(--faivform-space);
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    font-family: var(--faivform-primary-font);
  }

  :global(.faivform-option-label) {
    width: 100%;
    box-sizing: inherit;
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
    text-align: center;
  }

  :global(.faivform-option-input) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: var(--faivform-radius);
    transform: translate(-50%, -50%);
    appearance: none;
    outline-offset: 0;
    top: 50%;
    left: 50%;
    z-index: -1;
  }
  :global(.faivform-option-input:is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-option-input:is(:focus, :focus-visible)) {
    outline: var(--faivform-border-base);
    outline-offset: 0;
    outline-width: calc(var(--faivform-border-width) * 2);
  }

  :global(.faivform-option-content) {
    width: 100%;
    box-sizing: inherit;
  }
  :global(.faivform-option-error) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: calc(var(--faivform-space) / 4) 0;
    background-color: transparent;
    color: var(--faivform-error-color);
    font-size: calc((var(--faivform-space) / 2) + (var(--faivform-space) / 4));
    line-height: calc(
      (var(--faivform-space) / 2) + (var(--faivform-space) / 4)
    );
    font-weight: 500;
    font-family: var(--faivform-error-font);
    border-radius: calc(var(--faivform-radius) / 1.5);
    transform: translateY(calc(100% + var(--faivform-space) / 4));
    bottom: 0;
    left: 0;
    z-index: 0;
  }
</style>
