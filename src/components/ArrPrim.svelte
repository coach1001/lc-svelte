<script>
  import { createEventDispatcher } from "svelte";
  import Prim from "./Prim.svelte";

  export let form;
  export let parentValue;
  export let rootValue;
  export let value;

  const dispatcher = createEventDispatcher();

  const onValueChange = event => {
    value[event.detail.property] = event.detail.newValue;
    dispatcher("valueChange", {
      newValue: value,
      property: form.property
    });
  };
</script>

<style>
  .one-row-grid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
  }
</style>

{#if form != null}
  {#if value != null && value.length > 0}
    {#each value as val, i}
      <div class="one-row-grid">
        <Prim
          form={{ elementSubType: form.elementSubType, property: i }}
          value={val}
          on:valueChange={onValueChange}
          parentValue={value}
          {rootValue} />
      </div>
    {/each}
  {/if}
{/if}
