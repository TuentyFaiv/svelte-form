<svelte:options immutable />

<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys } from "$lib/logic/utils/keys.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import {
    Icon,
    IconHide,
    IconShow,
    IconChecked,
  } from "$lib/ui/assets/icons/index.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Input, Props } from "./Field.proptypes.js";

  type $$Props = Props;

  export let name: Props["name"];
  export let id: Props["id"] = null;
  export let label: Props["label"] = null;
  export let context: Props["context"] = "form";
  export let type: Props["type"] = "text";
  export let styles: Props["styles"] = {};
  export let datas: Props["datas"] = {};
  export let a11y: Props["a11y"] = {};

  let input: Input;
  let show = false;

  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField, check } = $form);
  $: ({ field: ctxFieldStyles, icons, replace } = $ctxStyles);

  function toggleShow() {
    show = !show;
  }

  function onChecked(event: UserEvent<HTMLInputElement, KeyboardEvent>) {
    if (event.code === keys.enter) {
      event.preventDefault();
      setField(name, !($data[name] ?? false));
    }
  }

  $: datasets = generateDatas(datas);

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "faivform-field-container",
      label: "faivform-field-label",
      area: "faivform-field-shared faivform-field-textarea",
      check: "faivform-field-checkbox",
      input: "faivform-field-shared faivform-field-input",
      action: "faivform-field-action",
      icon: "faivform-field-icon",
      error: "faivform-field-error",
    },
    externals: {
      container: styles?.container ?? ctxFieldStyles?.container,
      label: styles?.label ?? ctxFieldStyles?.label,
      area: styles?.area ?? ctxFieldStyles?.area,
      check: styles?.check ?? ctxFieldStyles?.check,
      input: styles?.input ?? ctxFieldStyles?.input,
      action: styles?.action ?? ctxFieldStyles?.action,
      icon: styles?.icon ?? ctxFieldStyles?.icon,
      error: styles?.error ?? ctxFieldStyles?.error,
    },
    icons: {
      show: styles?.show ?? ctxFieldStyles?.show ?? icons?.show,
      hide: styles?.hide ?? ctxFieldStyles?.hide ?? icons?.hide,
      checked:
        styles?.checked ??
        ctxFieldStyles?.checked ??
        icons?.checked ??
        `data:image/svg+xml,${encodeURIComponent(IconChecked)}`,
    },
  });

  onDestroy(() => {
    setField(name, undefined, false);
  });
</script>

<label
  for={id ?? name}
  class={styls.container}
  data-type={type}
  style={type === "checkbox"
    ? `--checked-img: url(${styls.checked});`
    : undefined}
  title={a11y?.title}
  {...datasets}
>
  {#if type !== "checkbox"}
    <slot>
      {#if label}
        <p class={styls.label}>
          {label}
        </p>
      {/if}
    </slot>
  {/if}
  {#if type === "textarea"}
    <textarea
      class={styls.area}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      on:input={check}
      data-error={!!$errors[name]}
      value={$data[name] ?? ""}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={styls.check}
      id={id ?? name}
      type="checkbox"
      bind:this={input}
      checked={$data[name] ?? false}
      data-error={!!$errors[name]}
      on:change={check}
      on:keydown={onChecked}
      {name}
      {...$$restProps}
    />
    <slot>
      {#if label}
        <p class={styls.label}>
          {label}
        </p>
      {/if}
    </slot>
  {:else}
    <input
      class={styls.input}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      on:input={check}
      type={type === "password" && show ? "text" : type}
      value={$data[name] ?? ""}
      data-error={!!$errors[name]}
      {name}
      {...$$restProps}
    />
  {/if}
  {#if type === "password"}
    <button
      type="button"
      class={styls.action}
      class:show
      on:click|stopPropagation={toggleShow}
      title={a11y?.icon}
    >
      <slot name="icon">
        <Icon
          style={styls.icon}
          src={show ? styls.show : styls.hide}
          alt={a11y?.icon}
          component={show ? IconShow : IconHide}
        />
      </slot>
    </button>
  {/if}
  <slot name="error" error={$errors[name]}>
    {#if $errors[name]}
      <span class={styls.error} transition:fade={{ duration: 200 }}>
        {$errors[name]}
      </span>
    {/if}
  </slot>
</label>

<style>
  :global(.faivform-field-container) {
    position: relative;
    display: block;
    container: field / inline-size;
    box-sizing: border-box;
    width: 100%;
    z-index: 0;
  }
  :global(
      .faivform-field-container[data-type="password"] > .faivform-field-error
    ) {
    right: calc(var(--faivform-space) * 2.5);
  }
  :global(.faivform-field-container[data-type="checkbox"]) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: calc(var(--faivform-space) / 2);
  }

  :global(.faivform-field-label) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    margin-bottom: calc(var(--faivform-space) / 4);
    color: var(--faivform-primary-text);
    font-size: var(--faivform-space);
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    font-family: var(--faivform-primary-font);
  }

  :global(.faivform-field-shared) {
    box-sizing: inherit;
    display: block;
    width: 100%;
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    color: var(--faivform-primary-text);
    background-color: var(--faivform-placeholder-color);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
    border: var(--faivform-border-base);
    border-radius: var(--faivform-radius);
    transition:
      border 200ms linear,
      outline 200ms linear;
    will-change: auto;
  }
  :global(.faivform-field-shared::placeholder) {
    color: var(--faivform-placeholder-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-placeholder-font);
  }
  :global(.faivform-field-shared:has([data-error="true"])),
  :global(.faivform-field-shared:invalid) {
    border-color: var(--faivform-error-color);
  }
  :global(.faivform-field-shared:focus),
  :global(.faivform-field-shared:focus-visible) {
    outline: var(--faivform-border-base);
    outline-color: var(--faivform-secondary-color);
    border-color: var(--faivform-secondary-color);
  }
  :global(.faivform-field-shared[data-error="true"]),
  :global(.faivform-field-shared:focus-visible:invalid) {
    outline-color: var(--faivform-error-color);
    border-color: var(--faivform-error-color);
  }

  :global(.faivform-field-input[type="number"]) {
    appearance: none;
    -moz-appearance: textfield;
  }
  :global(.faivform-field-input[type="number"]::-webkit-inner-spin-button),
  :global(.faivform-field-input[type="number"]::-webkit-outer-spin-button) {
    appearance: none;
    margin: 0;
  }

  :global(.faivform-field-textarea) {
    padding: calc(var(--faivform-space) / 2);
    min-height: 100px;
    resize: vertical;
    appearance: none;
  }

  :global(.faivform-field-checkbox) {
    display: block;
    cursor: pointer;
    appearance: none;
    width: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    min-width: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    min-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    border: var(--faivform-border-base);
    border-radius: var(--faivform-radius);
    transition:
      box-shadow 200ms linear,
      background-color 200ms linear;
    will-change: auto;
  }
  :global(.faivform-field-checkbox:focus-visible) {
    outline: 0;
    box-shadow: var(--faivform-shadow-base);
  }
  :global(.faivform-field-checkbox:checked) {
    background-color: var(--faivform-primary-color);
    background-image: var(--checked-img);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  :global(.faivform-field-checkbox[data-error="true"]) {
    border-color: var(--faivform-error-color);
  }
  :global(.faivform-field-checkbox + p) {
    margin-bottom: 0;
  }
  :global(.faivform-field-checkbox ~ .faivform-field-error) {
    transform: translateY(120%);
    left: 0;
    right: auto;
    bottom: 0;
    cursor: default;
  }

  :global(.faivform-field-action) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: calc(var(--faivform-space) * 1.5);
    min-width: calc(var(--faivform-space) * 1.5);
    height: calc(var(--faivform-space) * 1.5);
    padding: 0;
    background-color: transparent;
    color: var(--faivform-primary-text);
    font-size: calc((var(--faivform-space) / 2) + (var(--faivform-space) / 4));
    line-height: calc(
      (var(--faivform-space) / 2) + (var(--faivform-space) / 4)
    );
    font-family: var(--faivform-primary-font);
    transform: translateY(50%);
    border: 0;
    bottom: calc(
      ((var(--faivform-space) * 2) + (var(--faivform-space) / 4)) / 2
    );
    right: calc(var(--faivform-space) / 2);
    z-index: 0;
  }
  :global(:root:is(.dark, [data-theme="dark"]) .faivform-field-action) {
    filter: invert(1);
  }
  :global(.faivform-field-action:hover) {
    cursor: pointer;
  }

  :global(.faivform-field-icon) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    min-height: 100%;
    width: 100%;
    min-height: 100%;
    object-fit: contain;
  }

  :global(.faivform-field-error) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: calc(var(--faivform-space) / 4);
    background-color: var(--faivform-placeholder-color);
    color: var(--faivform-error-color);
    font-size: calc((var(--faivform-space) / 2) + (var(--faivform-space) / 4));
    line-height: calc(
      (var(--faivform-space) / 2) + (var(--faivform-space) / 4)
    );
    font-weight: 500;
    font-family: var(--faivform-error-font);
    border-radius: calc(var(--faivform-radius) / 1.5);
    transform: translateY(50%);
    bottom: calc(
      ((var(--faivform-space) * 2) + (var(--faivform-space) / 4)) / 2
    );
    right: calc(var(--faivform-space) / 2);
    z-index: 0;
  }

  @container field (max-width: 450px) {
    :global(
        .faivform-field-container[data-type="password"] > .faivform-field-error
      ) {
      right: 0;
    }
    :global(.faivform-field-error) {
      width: 100%;
      right: 0;
      left: 0;
      bottom: 0;
      padding: calc(var(--faivform-space) / 4) 0;
      transform: translateY(calc(100% + var(--faivform-space) / 4));
    }
  }
</style>
