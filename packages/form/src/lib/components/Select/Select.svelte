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

  import { Icon, IconArrow } from "$lib/icons/index.js";

  import "./Select.css";

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
  export let parent: Props["parent"] = undefined;
  export let options: Props["options"] = [];
  export let styles: Props["styles"] = {};

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
        search = multiple ? "" : (selection.label ?? "");
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
    const value = multiple ? (fixed?.map(({ value }) => value) ?? null) : null;
    setField(name, value);
    search = "";
    dispatch("clear");
  }

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
      container: "svorm-select-container",
      label: "svorm-select-label",
      select: "svorm-select-menu",
      value: "svorm-select-value",
      item: "svorm-select-item",
      remove: "svorm-select-remove",
      searchable: "svorm-select-searchable",
      nonsearchable: "svorm-select-nonsearchable",
      clear: "svorm-select-clear",
      icon: "svorm-select-icon",
      options: "svorm-select-options",
      option: "svorm-select-option",
      error: "svorm-select-error",
      empty: "svorm-select-empty",
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

  $: onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    const bottom = entry.boundingClientRect.bottom;
    const onWindow = bottom > window.innerHeight;

    if (!entry.isIntersecting && !parent) {
      toTop = onWindow;
    }

    if (!entry.isIntersecting && parent) {
      const client = parent.getBoundingClientRect();
      toTop = bottom > client.bottom || onWindow;
    }
  };

  $: observer =
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
          {items && items.length > 0 ? (items ?? placeholder) : placeholder}
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
