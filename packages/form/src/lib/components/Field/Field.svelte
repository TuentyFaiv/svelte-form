<svelte:options immutable />

<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { Eye, EyeClosed } from "lucide-svelte";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys } from "$lib/logic/utils/keys.js";
  import { getStyles } from "$lib/logic/utils/styles.js";
  import { IconChecked } from "$lib/icons/index.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Input, Props } from "./Field.proptypes.js";

  import "./Field.css";

  type $$Props = Props;

  export let name: Props["name"];
  export let id: Props["id"] = null;
  export let label: Props["label"] = null;
  export let clearOnDestroy: Props["clearOnDestroy"] = false;
  export let context: Props["context"] = "form";
  export let type: Props["type"] = "text";
  export let styles: Props["styles"] = {};
  export let a11y: Props["a11y"] = {};
  // events prepare for svelte 5
  export let oninput: Props["oninput"] = undefined;
  export let onblur: Props["onblur"] = undefined;
  export let onfocus: Props["onfocus"] = undefined;

  let input: Input;
  let show = false;

  $: form = useForm<{
    [k: string]: string | number | boolean | undefined | null;
  }>(context);
  $: ({ data, errors, styles: ctxStyles, setField, check } = $form);
  $: ({ field: ctxFieldStyles, replace } = $ctxStyles);

  function toggleShow() {
    show = !show;
  }

  function onChecked(event: UserEvent<HTMLInputElement, KeyboardEvent>) {
    if (event.code === keys.enter) {
      event.preventDefault();
      setField(name, !($data[name] ?? false));
    }
  }

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "svorm-field-container",
      label: "svorm-field-label",
      area: "svorm-field-shared svorm-field-textarea",
      check: "svorm-field-checkbox",
      input: "svorm-field-shared svorm-field-input",
      action: "svorm-field-action",
      icon: "svorm-field-icon",
      error: "svorm-field-error",
      checked:
        styles?.checked ??
        ctxFieldStyles?.checked ??
        `data:image/svg+xml,${encodeURIComponent(IconChecked)}`,
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
  });

  onDestroy(() => {
    if (clearOnDestroy) setField(name, undefined, false);
  });
</script>

{#key form}
  <label
    for={id ?? name}
    class={styls.container}
    data-type={type}
    style={type === "checkbox"
      ? `--checked-img: url(${styls.checked});`
      : undefined}
    title={a11y?.title}
  >
    {#if type !== "checkbox"}
      <slot>
        {#if label}
          <span class={styls.label}>
            {label}
          </span>
        {/if}
      </slot>
    {/if}
    {#if type === "textarea"}
      <textarea
        class={styls.area}
        id={id ?? name}
        bind:this={input}
        on:blur={(event) => {
          check(event);
          onblur?.(event);
        }}
        on:input={(event) => {
          check(event);
          oninput?.(event);
        }}
        on:focus={(event) => onfocus?.(event)}
        data-error={!!$errors[name]}
        value={`${$data[name] ?? ""}`}
        {name}
        {...$$restProps}
      />
    {:else if type === "checkbox"}
      <input
        class={styls.check}
        id={id ?? name}
        type="checkbox"
        bind:this={input}
        checked={Boolean($data[name])}
        data-error={!!$errors[name]}
        on:change={check}
        on:keydown={onChecked}
        {name}
        {...$$restProps}
      />
      <slot>
        {#if label}
          <span class={styls.label}>
            {label}
          </span>
        {/if}
      </slot>
    {:else}
      <input
        class={styls.input}
        id={id ?? name}
        bind:this={input}
        on:blur={(event) => {
          check(event);
          onblur?.(event);
        }}
        on:input={(event) => {
          check(event);
          oninput?.(event);
        }}
        on:focus={(event) => onfocus?.(event)}
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
        <slot name="icon" {show}>
          <svelte:component
            this={show ? EyeClosed : Eye}
            size={20}
            class={styls.icon}
          />
        </slot>
      </button>
    {/if}
    {#if $errors[name]}
      <span class={styls.error} transition:fade={{ duration: 200 }}>
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
    {/if}
  </label>
{/key}
