<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { slide } from "svelte/transition";
  import { keys } from "$lib/logic/utils/keys.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props, Select, Target } from "./Select.proptypes.js";

  import * as stylesinternal from "./Select.styles.js";

  export let name: Props["name"];
  export let label: Props["label"] = null;
  export let id: Props["id"] = null;
  export let options: Props["options"] = [];
  export let placeholder: Props["placeholder"] = "";
  export let context: Props["context"] = "form";
  export let datas: Props["datas"] = {};
  export let t: Props["t"] = (msg) => msg;

  let container: Select = null;
  let active = false;

  const form = getContext<InputContext>(context);
  const { data, errors, styles: ctxStyles, setField } = $form;
  const dispatch = createEventDispatcher<{ choose: string }>();
  $: ({ select: styles } = $ctxStyles);

  function onChoose(value: string) {
    dispatch("choose", value);
  }

  function handleToggle() {
    active = !active;
  }

  function handleChoose(element: HTMLElement) {
    const option =
      element.role === "none" && element.tagName === "SPAN"
        ? element.parentElement ?? element
        : element;
    const { value } = option.dataset;
    if (value) {
      setField(name, value);
      onChoose(value);
    }
    active = false;
  }

  function handleSelect(event: MouseEvent) {
    const element = event.target as Target;
    const isMenu =
      element.role === "menu" ||
      (element.role === "none" && element.parentElement?.role === "menu") ||
      (element.role === "none" &&
        (element.parentElement?.role === "presentation" ||
          element.firstElementChild?.role === "presentation")) ||
      (element.role === "presentation" &&
        (element.parentElement?.role === "none" ||
          element.firstElementChild?.role === "none"));
    const isOption =
      (element.role === "none" &&
        (element.parentElement?.role === "menuitem" ||
          element.firstElementChild?.role === "menuitem")) ||
      (element.role === "menuitem" &&
        (element.parentElement?.role === "none" ||
          element.firstElementChild?.role === "none"));

    if (isOption) {
      handleChoose(element);
    } else if (isMenu) {
      handleToggle();
      if (container) container.lastElementChild?.scrollTo(0, 0);
    }
  }

  function onOpenByKey(event: KeyboardEvent) {
    if (event.code === keys.enter) {
      handleToggle();
    }
  }

  function onChooseByKey(event: KeyboardEvent) {
    const element = event.target as HTMLElement;
    if (event.code === keys.enter) {
      handleChoose(element);
    }
  }

  $: datasets = generateDatas(datas);
  $: showedValue =
    options.find(({ value }) => value === $data[name])?.label ||
    (!!$data[name] ? $data[name] : placeholder);

  $: {
    if (options.length === 1 && $data[name] !== options[0].value) {
      setField(name, options[0].value);
      onChoose(options[0].value);
    }
  }

  onDestroy(() => {
    setField(name, $data[name]);
  });
</script>

<div
  {id}
  class={styles?.field ?? stylesinternal.field}
  role="menu"
  aria-label={label}
  tabindex={0}
  on:click|stopPropagation={!datas?.disabled ? handleSelect : undefined}
  on:keydown|stopPropagation={onOpenByKey}
  {...datasets}
>
  {#if label}
    <p class={styles?.label ?? stylesinternal.label} role="none">
      {label}
    </p>
  {/if}
  <div
    role="none"
    class={styles?.select ?? stylesinternal.select}
    class:active
    bind:this={container}
  >
    <p
      role="presentation"
      class={styles?.value ?? stylesinternal.value}
      data-gradient={showedValue === placeholder}
    >
      {showedValue}
      {#if $errors[name]}
        <span class={styles?.error ?? stylesinternal.error} role="none">
          <slot name="error" error={$errors[name]}>
            {t(`${$errors[name]}`)}
          </slot>
        </span>
      {/if}
    </p>
    {#if active}
      <div
        role="none"
        class={styles?.options ?? stylesinternal.options}
        on:mouseleave|stopPropagation={active
          ? () => {
              handleToggle();
              setField(name, $data[name] ?? "");
            }
          : undefined}
        on:keydown|stopPropagation={onChooseByKey}
        transition:slide={{ delay: 200 }}
      >
        {#each options as option (option.key ?? option.value)}
          <span
            role="menuitem"
            aria-disabled={!!option.disabled}
            tabindex={0}
            data-value={option.value}
            class={styles?.option ?? stylesinternal.option}
          >
            <span role="none">{option.label}</span>
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>
