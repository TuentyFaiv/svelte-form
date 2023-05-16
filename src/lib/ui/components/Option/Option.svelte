<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { getConfig } from "$lib/logic/stores/config.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Option, Props } from "./Option.proptypes.js";

  import * as stylesinternal from "./Option.styles.js";

  export let label: Props["label"];
  export let name: Props["name"];
  export let id: Props["id"];
  export let value: Props["value"];
  export let datas: Props["datas"] = {};
  export let context: Props["context"] = "form";

  let input: Option;

  const { i18n } = getConfig();
  const form = getContext<InputContext>(context);
  const { data, errors, styles: ctxStyles, check, setField } = $form;
  const dispatch = createEventDispatcher<{ choose: string }>();
  $: ({ option: styles } = $ctxStyles);

  function onSelect(value: string) {
    dispatch("choose", value);
  }

  async function onCheck(event: FocusEvent | Event) {
    await check(event);
    onSelect(value);
  }

  $: title = `${label} ${$errors[name] ? $i18n.t(`${$errors[name]}`) : ""}`;
  $: datasets = generateDatas(datas);

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id}
  class={styles?.field ?? stylesinternal.field}
  data-checked={$data[name] === value}
  {title}
  {...datasets}
>
  <p class={styles?.label ?? stylesinternal.label}>{$i18n.t(label ?? "")}</p>
  <input
    class={styles?.input ?? stylesinternal.input}
    type="radio"
    {id}
    bind:this={input}
    on:blur={onCheck}
    on:input={onCheck}
    {name}
    {value}
    {...$$restProps}
  />
  <div class={styles?.content ?? stylesinternal.content}>
    <slot />
  </div>
  {#if $errors[name]}
    <span class={styles?.error ?? stylesinternal.error} transition:fade|local>
      {$i18n.t(`${$errors[name]}`)}
    </span>
  {/if}
</label>
