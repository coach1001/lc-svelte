<script>
  import { createEventDispatcher } from "svelte";
  import ArrObj from "./ArrObj.svelte";
  import ArrPrim from "./ArrPrim.svelte";
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

</style>

{#if form != null}
  <div class="border rounded p-4 mb-4">
    {#if form.childElements != null}
      {#each form.childElements as element}
        {#if element.elementType === 'obj'}
          <svelte:self
            bind:form={element}
            value={value[element.property]}
            on:valueChange={onValueChange}
            parentValue={value}
            {rootValue} />
        {:else if element.elementType === 'arrObj'}
          <ArrObj
            bind:form={element}
            value={value[element.property]}
            on:valueChange={onValueChange}
            parentValue={value}
            {rootValue} />
        {:else if element.elementType === 'arrPrim'}
          <ArrPrim
            bind:form={element}
            value={value[element.property]}
            on:valueChange={onValueChange}
            parentValue={value}
            {rootValue} />
        {:else if element.elementType === 'prim'}
          <Prim
            bind:form={element}
            value={value[element.property]}
            on:valueChange={onValueChange}
            parentValue={value}
            {rootValue} />
        {/if}
      {/each}
    {/if}
  </div>
{/if}
