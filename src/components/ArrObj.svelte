<script>
  import { createEventDispatcher } from "svelte";
  import Obj from "./Obj.svelte";

  export let form;
  export let parentValue;
  export let rootValue;
  export let value;

  const dispatcher = createEventDispatcher();

  const onValueChange = (event, __id__) => {
    const oIdx = value.findIndex(val => val.__id__ === __id__);
    value[oIdx] = event.detail.newValue;
    dispatcher("valueChange", {
      newValue: value,
      property: form.property
    });
  };

  const markForRemoval = __id__ => {
    console.log("mark for removal", __id__);
    const oIdx = value.findIndex(val => val.__id__ === __id__);
    value[oIdx].__op__ = "remove";
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
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
  }
  .rnd-sm {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: relative;
  }
  .btn span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="border rounded p-4 mb-4">
  {#if form != null}
    {#if value != null && value.length > 0}
      {#each value as val, i (val.__id__)}
        {#if val.__op__ !== 'remove'}
          <div class="one-row-grid">
            <Obj
              bind:form
              value={value[i]}
              on:valueChange={event => onValueChange(event, val.__id__)}
              parentValue={value}
              {rootValue} />
            <span class="btn-group-sm">
              <button
                on:click={markForRemoval(val.__id__)}
                type="button"
                class="btn btn-danger rnd-sm">
                <span class="fa fa-2x fa-fw fa-remove" />
              </button>
            </span>
          </div>
        {/if}
      {/each}
    {/if}
  {/if}
</div>
