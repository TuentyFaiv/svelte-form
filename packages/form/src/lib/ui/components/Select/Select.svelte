<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys, tags } from "$lib/logic/utils/keys.js";
  import { generateDatas, isSelected } from "$lib/logic/utils/objects.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
  import type { Props, Events, Target } from "./Select.proptypes.js";

  import { Icon, IconArrow } from "$lib/ui/assets/icons/index.js";

  type $$Props = Props;

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let label: Props["label"] = null;
  export let placeholder: Props["placeholder"] = "";
  export let id: Props["id"] = null;
  export let autoselect: Props["autoselect"] = true;
  export let searchable: Props["searchable"] = true;
  export let clearable: Props["clearable"] = true;
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let clearOnDestroy: Props["clearOnDestroy"] = false;
  export let options: Props["options"] = [];
  export let styles: Props["styles"] = {};
  export let datas: Props["datas"] = {};

  let container: HTMLDivElement | null = null;
  let select: HTMLDivElement | null = null;
  let labelElement: HTMLParagraphElement | null = null;
  let valueBoxElement: HTMLDivElement | null = null;
  let searchableElement: HTMLInputElement | null = null;
  let nonsearchableElement: HTMLSpanElement | null = null;
  let arrowElement: HTMLImageElement | null = null;
  let errorElement: HTMLSpanElement | null = null;
  let optionsElement: HTMLDivElement | null = null;

  let active = false;
  let search = "";
  let fixed: SelectOption[] | null = null;

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField, setError } = $form);
  $: ({ select: ctxSelectStyles, icons, replace } = $ctxStyles);

  function onChoose(value: SelectOption) {
    dispatch("choose", value);
  }

  function onToggle(open?: unknown) {
    if (typeof open === "boolean") {
      active = open;
    } else {
      active = !active;
    }
  }

  function onHasValue() {
    if (!multiple && $data[name]) {
      const selection = options.find(({ value }) => value === $data[name]);
      search = selection?.label ?? "";
    }
  }

  function handleChoose(element: HTMLElement) {
    const isOptions = element === optionsElement;
    const optionElement = isOptions
      ? (element.firstElementChild as HTMLElement)
      : element;
    const { value } = optionElement.dataset;

    if (value) {
      const selection = options.find((option) => option.value === value);

      if (!selection) {
        setError(name, "Invalid option, this option does not exist");
        return;
      }

      const updated: string | string[] = multiple
        ? [...hasArray<string>($data[name]), selection.value]
        : selection.value;

      if (searchable) {
        search = multiple ? "" : selection.label ?? "";
      }

      setField(name, updated);
      onChoose(selection);
    }

    onToggle(multiple);
  }

  function handleSelect({ target }: UserEvent<Target, MouseEvent>) {
    const element = target as Target;

    const isContainer = element === container;
    const isSelect = element === select;
    const isLabel = element === labelElement;
    const isValueBox = element === valueBoxElement;
    const isSearchable = element === searchableElement;
    const isNonsearchable = element === nonsearchableElement;
    const isArrow = element === arrowElement;
    const isError = element === errorElement;
    const isOptions = element === optionsElement;

    const isMenu =
      isContainer ||
      isSelect ||
      isLabel ||
      isValueBox ||
      isSearchable ||
      isNonsearchable ||
      isArrow ||
      isError ||
      isOptions;
    const isOption =
      element.tagName === tags.span &&
      JSON.parse(element.dataset.option ?? "false") &&
      !isMenu;

    if (isOption) {
      handleChoose(element);
    } else if (isMenu) {
      onToggle();
      if (container) container.lastElementChild?.scrollTo(0, 0);
    }
  }

  function onOpenByKey({ code }: UserEvent<HTMLDivElement, KeyboardEvent>) {
    if (code === keys.enter) {
      onToggle();
    }
  }

  function onChooseByKey({
    code,
    target,
  }: UserEvent<HTMLDivElement, KeyboardEvent>) {
    if (code === keys.enter) {
      handleChoose(target as HTMLElement);
    }
  }

  function onHide() {
    onToggle();
    onHasValue();
    setField(name, $data[name] ?? null);
  }

  function onRemove(option: SelectOption) {
    const newSelection = hasArray<string>($data[name]).filter(
      (value) => value !== option.value,
    );
    setField(name, newSelection);
    dispatch("remove", option);
  }

  function onClear() {
    const value = multiple ? fixed?.map(({ value }) => value) ?? null : null;
    setField(name, value);
    search = "";
    dispatch("clear");
  }

  $: datasets = generateDatas(datas);

  $: if (
    autoselect &&
    options.length === 1 &&
    $data[name] !== options[0].value
  ) {
    const value = options[0].value;
    setField(name, multiple ? [value] : value);
    onChoose(options[0]);
    onHasValue();
  }

  $: if (multiple) {
    fixed = options.filter((option) => option.fixed);

    if (fixed.length > 0) {
      setField(
        name,
        fixed.map(({ value }) => value),
      );
    }
  }

  $: optionsToShow = (
    searchable && search.toLowerCase() !== $data[name]
      ? options.filter(({ label }) =>
          label.toLowerCase().includes(search.toLowerCase()),
        )
      : options
  ).filter(({ value }) => (multiple ? !isSelected($data[name], value) : true));

  $: items = (
    multiple
      ? options.filter(({ value }) => isSelected($data[name], value))
      : options.find(({ value }) => value === $data[name])?.label ||
        ($data[name] ?? null)
  ) as SelectOption[] | string | null;

  $: toClear =
    multiple && Array.isArray(items)
      ? items.filter((option) => !option.fixed)
      : items;
  $: showClear = clearable && toClear && toClear.length > 0;

  $: if ($data[name]) {
    onHasValue();
  }

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "faivform-select-container",
      label: "faivform-select-label",
      select: "faivform-select-menu",
      value: "faivform-select-value",
      item: "faivform-select-item",
      remove: "faivform-select-remove",
      searchable: "faivform-select-searchable",
      nonsearchable: "faivform-select-nonsearchable",
      clear: "faivform-select-clear",
      icon: "faivform-select-icon",
      options: "faivform-select-options",
      option: "faivform-select-option",
      error: "faivform-select-error",
      empty: "faivform-select-empty",
    },
    externals: {
      container: styles?.container ?? ctxSelectStyles?.container,
      label: styles?.label ?? ctxSelectStyles?.label,
      select: styles?.select ?? ctxSelectStyles?.select,
      value: styles?.value ?? ctxSelectStyles?.value,
      item: styles?.item ?? ctxSelectStyles?.item,
      remove: styles?.remove ?? ctxSelectStyles?.remove,
      searchable: styles?.searchable ?? ctxSelectStyles?.searchable,
      nonsearchable: styles?.nonsearchable ?? ctxSelectStyles?.nonsearchable,
      clear: styles?.clear ?? ctxSelectStyles?.clear,
      icon: styles?.icon ?? ctxSelectStyles?.icon,
      options: styles?.options ?? ctxSelectStyles?.options,
      option: styles?.option ?? ctxSelectStyles?.option,
      error: styles?.error ?? ctxSelectStyles?.error,
      empty: styles?.empty ?? ctxSelectStyles?.empty,
    },
    icons: {
      arrow: icons?.arrow,
    },
  });
  let toTop = false;

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (!entry.isIntersecting) {
      toTop = entry.boundingClientRect.bottom > window.innerHeight;
    }
  };

  const observer =
    typeof window !== "undefined"
      ? new IntersectionObserver(onIntersect, {
          threshold: 1,
        })
      : undefined;

  $: if (optionsElement) {
    observer?.unobserve(optionsElement);
    observer?.observe(optionsElement);
  }

  onDestroy(() => {
    if (clearOnDestroy) setField(name, undefined, false);
    observer?.disconnect();
  });
</script>

<div
  {id}
  bind:this={container}
  class={styls.container}
  class:top={toTop}
  role="presentation"
  data-disabled={disabled}
  on:click|stopPropagation={!disabled ? handleSelect : undefined}
  on:keydown|stopPropagation={!disabled ? onOpenByKey : undefined}
  on:mouseleave|stopPropagation={active ? onHide : undefined}
  {...datasets}
>
  <slot>
    {#if label}
      <p bind:this={labelElement} class={styls.label} role="presentation">
        {label}
      </p>
    {/if}
  </slot>
  <div
    bind:this={select}
    class={styls.select}
    class:active
    data-multiple={multiple}
    data-error={!!$errors[name]}
    aria-disabled={disabled}
    role="menu"
    {...disabled ? {} : { tabindex: 0 }}
  >
    <div role="presentation" class={styls.value} bind:this={valueBoxElement}>
      {#if multiple && Array.isArray(items)}
        {#each items as item (item.key ?? item.value)}
          <span
            role="presentation"
            class={styls.item}
            data-fixed={item.fixed}
            in:fade={{ duration: 200 }}
            out:slide={{ duration: 250, axis: "x" }}
          >
            <slot name="item" {item}>
              {item.label}
            </slot>
            {#if !item.fixed}
              <button
                type="button"
                class="svform-remove-childs {styls.remove}"
                on:click|stopPropagation={() => onRemove(item)}
              >
                <slot name="remove">x</slot>
              </button>
            {/if}
          </span>
        {/each}
      {/if}
      {#if searchable}
        <input
          type="text"
          class={styls.searchable}
          bind:this={searchableElement}
          bind:value={search}
          on:input={!active ? onToggle : undefined}
          {placeholder}
          {disabled}
        />
      {:else if (!searchable && !multiple) || (!searchable && Array.isArray(items) && items.length === 0)}
        <span
          bind:this={nonsearchableElement}
          class={styls.nonsearchable}
          data-placeholder={items?.length === 0 || !items}
          role="presentation"
        >
          {items && items.length > 0 ? items ?? placeholder : placeholder}
        </span>
      {/if}
    </div>
    {#if showClear}
      <button
        type="button"
        class="svform-clear-childs {styls.clear}"
        on:click|stopPropagation={onClear}
      >
        <slot name="clear">X</slot>
      </button>
    {/if}
    <slot name="arrow">
      <Icon
        style={styls.icon}
        src={styls.arrow}
        alt={placeholder ?? ""}
        bind:element={arrowElement}
        component={IconArrow}
      />
    </slot>
    {#if active}
      <div
        role="presentation"
        class={styls.options}
        class:top={toTop}
        bind:this={optionsElement}
        on:keydown|stopPropagation={onChooseByKey}
        in:slide={{ duration: 200 }}
        out:fade={{ duration: 180 }}
      >
        {#each optionsToShow as option (option.key ?? option.value)}
          <span
            role="menuitem"
            aria-disabled={!!option.disabled}
            tabindex={0}
            class="svform-option-childs {styls.option}"
            data-value={option.value}
            data-option={true}
          >
            <slot name="option" {option}>
              {option.label}
            </slot>
          </span>
        {/each}
        {#if optionsToShow.length === 0}
          <span class={styls.empty}>
            <slot name="empty">No options</slot>
          </span>
        {/if}
      </div>
    {/if}
  </div>
  {#if $errors[name]}
    <span
      bind:this={errorElement}
      class="svform-error-childs {styls.error}"
      role="presentation"
      transition:fade={{ duration: 200 }}
    >
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</div>

<style>
  :global(.faivform-select-container) {
    position: relative;
    container: select / inline-size;
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
  }
  :global(.faivform-select-container::after) {
    position: absolute;
    box-sizing: inherit;
    display: block;
    content: "";
    width: 100%;
    height: calc(var(--faivform-space) / 2);
    transform: translateX(-50%);
    top: 100%;
    left: 50%;
    z-index: 0;
  }
  :global(.faivform-select-container.top::after) {
    top: auto;
    bottom: calc(var(--faivform-space) / 4 * 9);
  }
  :global(.faivform-select-container:is([data-disabled="true"])) {
    cursor: not-allowed;
    filter: grayscale(1) opacity(0.5);
  }

  :global(.faivform-select-label) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    margin-bottom: calc(var(--faivform-space) / 4);
    color: var(--faivform-primary-text);
    font-size: var(--faivform-space);
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    font-family: var(--faivform-primary-font);
  }

  :global(.faivform-select-menu) {
    position: relative;
    box-sizing: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: calc(var(--faivform-space) / 2);
    padding-right: calc(
      (var(--faivform-space) * 2) + (var(--faivform-space) / 4)
    );
    color: var(--faivform-primary-text);
    background-color: var(--faivform-placeholder-color);
    border: var(--faivform-border-base);
    border-radius: var(--faivform-radius);
    z-index: 0;
  }
  :global(.faivform-select-menu:is([aria-disabled="true"])) {
    outline: 0;
  }
  :global(.faivform-select-menu:is([aria-disabled="true"]) > *) {
    pointer-events: none;
  }
  :global(.faivform-select-menu:is([data-multiple="true"])) {
    padding-left: calc(var(--faivform-space) / 1.5);
  }
  :global(
      .faivform-select-menu:is([data-multiple="true"])
        .faivform-select-searchable
    ),
  :global(
      .faivform-select-menu:is([data-multiple="true"])
        .faivform-select-nonsearchable
    ) {
    padding-left: 0;
  }
  :global(.faivform-select-menu:not([aria-disabled="true"]):is(:hover)) {
    cursor: pointer;
  }
  :global(
      .faivform-select-menu:not([aria-disabled="true"]):is(
          :focus,
          :focus-visible
        )
    ) {
    outline: var(--faivform-border-base);
    outline-color: var(--faivform-secondary-color);
    border-color: var(--faivform-secondary-color);
  }
  :global(
      .faivform-select-menu:not([aria-disabled="true"]):is([data-error="true"])
    ),
  :global(
      .faivform-select-menu:not([aria-disabled="true"]):is(
          [data-error="true"]
        ):is(:focus, :focus-visible)
    ) {
    outline-color: var(--faivform-error-color);
    border-color: var(--faivform-error-color);
  }
  :global(
      .faivform-select-menu:is(:focus, :focus-visible)
        > .faivform-select-searchable
    ) {
    outline: 0;
  }
  :global(
      .faivform-select-menu:is(:focus, :focus-visible).active
        > .faivform-select-options
    ) {
    width: calc(100% + (var(--faivform-border-width) * 4));
    border-width: calc(var(--faivform-border-width) * 2);
    border-color: var(--faivform-secondary-color);
  }
  :global(.faivform-select-menu.active > .faivform-select-icon) {
    transform: translateY(-50%) rotateX(180deg);
  }

  :global(.faivform-select-value) {
    position: relative;
    box-sizing: inherit;
    display: flex;
    width: 100%;
    min-height: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    margin: 0;
    padding: calc(var(--faivform-space) / 2) 0;
    align-items: stretch;
    justify-content: flex-start;
    gap: calc(var(--faivform-space) / 4);
    flex-wrap: wrap;
    z-index: 0;
  }

  :global(.faivform-select-item) {
    box-sizing: inherit;
    display: flex;
    width: max-content;
    align-items: center;
    justify-content: flex-start;
    gap: calc(var(--faivform-space) / 4);
    padding-left: calc(var(--faivform-space) / 4);
    background-color: rgb(var(--faivform-placeholder-200) / 1);
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space));
    font-family: var(--faivform-placeholder-font);
    border-radius: calc(var(--faivform-radius) / 2);
  }
  :global(.dark .faivform-select-item),
  :global([data-theme="dark"] .faivform-select-item) {
    background-color: rgb(var(--faivform-placeholder-400) / 1);
  }
  :global(.dark .faivform-select-item:is([data-fixed="true"])),
  :global([data-theme="dark"] .faivform-select-item:is([data-fixed="true"])),
  :global(.faivform-select-item:is([data-fixed="true"])) {
    background-color: var(--faivform-secondary-color);
    color: var(--faivform-secondary-text);
    padding: 0 calc(var(--faivform-space) / 4);
  }

  :global(.faivform-select-remove) {
    display: block;
    box-sizing: inherit;
    width: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    height: 100%;
    min-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    margin: 0;
    padding: 0;
    padding-bottom: calc((var(--faivform-space) / 8));
    background-color: transparent;
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space));
    line-height: calc(var(--faivform-space));
    font-family: var(--faivform-placeholder-font);
    font-weight: 500;
    border: 0;
    border-left-color: var(--faivform-placeholder-color);
    border-radius: 0 calc(var(--faivform-radius) / 2)
      calc(var(--faivform-radius) / 2) 0;
    transition: background-color 200ms linear;
    will-change: background-color;
  }
  :global(.faivform-select-remove:is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-select-remove:is(:hover, :focus, :focus-visible)) {
    color: var(--faivform-error-text);
    outline: 0;
    background-color: var(--faivform-error-color);
  }

  :global(.faivform-select-searchable),
  :global(.faivform-select-nonsearchable) {
    display: block;
    box-sizing: inherit;
    flex: 1;
    width: 100%;
    min-width: 100px;
    min-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    padding: 0 calc(var(--faivform-space) / 1.5);
    color: var(--faivform-primary-text);
    background-color: var(--faivform-placeholder-color);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
    border-top-left-radius: var(--faivform-radius);
    border-bottom-left-radius: var(--faivform-radius);
    border: 0;
  }
  :global(.faivform-select-searchable:is(:focus, :focus-visible)) {
    outline: 0;
  }
  :global(.faivform-select-nonsearchable:is([data-placeholder="true"])),
  :global(.faivform-select-searchable::placeholder) {
    color: var(--faivform-placeholder-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-placeholder-font);
  }

  :global(.faivform-select-clear) {
    display: block;
    box-sizing: inherit;
    width: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    min-width: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    min-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-weight: 500;
    font-family: var(--faivform-error-font);
    border: 0;
    border-radius: calc(var(--faivform-radius) / 2);
    transition: background-color 200ms linear;
    will-change: background-color;
  }
  :global(.faivform-select-clear:is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-select-clear:is(:hover, :focus, :focus-visible)) {
    color: var(--faivform-error-text);
    outline: 0;
    background-color: var(--faivform-error-color);
  }

  :global(.faivform-select-icon) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    object-fit: contain;
    transform: translateY(-50%);
    transition: transform 200ms linear;
    pointer-events: none;
    top: 50%;
    right: calc(var(--faivform-space) / 2);
    z-index: 0;
  }
  :global(.dark .faivform-select-icon),
  :global([data-theme="dark"] .faivform-select-icon) {
    filter: invert(1);
  }

  :global(.faivform-select-options) {
    position: absolute;
    display: flex;
    box-sizing: inherit;
    width: calc(100% + (var(--faivform-border-width) * 2));
    max-height: 150px;
    background-color: var(--faivform-placeholder-color);
    border: var(--faivform-border-base);
    border-radius: var(--faivform-radius);
    box-shadow: var(--faivform-shadow-base);
    overflow-y: auto;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    transform: translateX(-50%);
    top: calc(100% + (var(--faivform-space) / 2));
    left: 50%;
    z-index: 1;
  }
  :global(.faivform-select-options.top) {
    top: auto;
    bottom: calc(100% + (var(--faivform-space) / 2));
  }
  :global(.faivform-select-options::-webkit-scrollbar:vertical) {
    width: calc((var(--faivform-space) / 2));
    height: 100%;
    background-color: transparent;
  }
  :global(.faivform-select-options::-webkit-scrollbar-thumb) {
    background-color: rgb(var(--faivform-placeholder-700) / 1);
    border-radius: var(--faivform-radius);
  }

  :global(.faivform-select-remove-childs > *),
  :global(.faivform-select-clear-childs > *),
  :global(.faivform-select-error-childs > *),
  :global(.faivform-select-option-childs > *) {
    pointer-events: none;
  }

  :global(.faivform-select-option) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
  }
  :global(.faivform-select-option:is([aria-disabled="true"])) {
    pointer-events: none;
  }
  :global(.faivform-select-option:is(:hover, :focus, :focus-visible)) {
    color: var(--faivform-primary-text);
    outline: 0;
    background-color: var(--faivform-primary-color);
  }
  :global(.dark .faivform-select-option:is(:hover, :focus, :focus-visible)),
  :global(
      [data-theme="dark"]
        .faivform-select-option:is(:hover, :focus, :focus-visible)
    ) {
    color: rgb(var(--faivform-primary-900) / 1);
  }

  :global(.faivform-select-empty) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    color: var(--faivform-placeholder-text);
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
    text-align: center;
  }

  :global(.faivform-select-error) {
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
    right: calc((var(--faivform-space) * 2) + (var(--faivform-space) / 4));
    z-index: 0;
  }

  @container select (max-width: 450px) {
    :global(.faivform-select-error) {
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: transparent;
      padding: calc(var(--faivform-space) / 4) 0;
      transform: translateY(calc(100% + var(--faivform-space) / 4));
    }
  }
</style>
