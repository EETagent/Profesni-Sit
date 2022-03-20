<script lang="ts">
  import OutClick from "../../outclick.svelte";

  export let id: string;
  export let placeholder: string = "";

  export let disabled: boolean = false;

  let calendarElement: HTMLElement;

  const MONTHS = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];
  const DAYS = ["Ne", "Po", "Út", "St", "Čt", "Pa", "So"];

  const TODAY = new Date();

  let showDatepicker: boolean = false;

  let month: number = TODAY.getMonth();
  let year: number = TODAY.getFullYear();

  let numberOfDays: Array<number> = [];
  let blankDays: Array<number> = [];

  export let datepickerValue: string = "";

  const isToday = (date): boolean => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  };

  const getDateValue = (date): void => {
    let selectedDate: Date = new Date(year, month, date);
    datepickerValue = selectedDate.toDateString();
    showDatepicker = false;
  };

  const getNumberOfDays = (): void => {
    let daysInMonth: number = new Date(year, month + 1, 0).getDate();
    let dayOfWeek: number = new Date(year, month).getDay();

    let blankdaysArray: Array<number> = Array.from(Array(dayOfWeek + 1).keys());
    blankdaysArray.shift();

    let daysArray: Array<number> = Array.from(Array(daysInMonth + 1).keys());
    daysArray.shift();

    blankDays = blankdaysArray;
    numberOfDays = daysArray;
  };

  const shiftDateLeft = () => {
    month === 0
      ? () => {
          year++;
          month = 12;
        }
      : month--;

    getNumberOfDays();
  };
  const shiftDateRigth = () => {
    month === 11
      ? () => {
          year++;
          month = 0;
        }
      : month++;

    getNumberOfDays();
  };
  getNumberOfDays();
</script>

<svelte:body
  on:keyup={(k) => {
    if (k.key === "Escape") {
      showDatepicker = false;
    }
  }} />

<div>
  <div class="relative">
    <OutClick
      excludeByDOMNode={[calendarElement]}
      on:outclick={() => (showDatepicker = false)}
    >
      <input
        {id}
        name={id}
        type="text"
        readonly
        bind:value={datepickerValue}
        on:click={() => (showDatepicker = !showDatepicker)}
        {placeholder}
        {disabled}
      />
    </OutClick>

    <div class="absolute top-0 right-0 px-3 py-2">
      <svg
        class="h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>

    {#if showDatepicker}
      <div
        bind:this={calendarElement}
        class="z-30 bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
        style="width: 17rem"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-lg font-bold text-gray-800">{MONTHS[month]}</span>
            <span class="ml-1 text-lg text-gray-600 font-normal">{year}</span>
          </div>
          <div class="flex flex-row justify-center items-center">
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              on:click={() => {
                year--;
                getNumberOfDays();
              }}
            >
              <svg
                class="h-5 w-5 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              on:click={shiftDateLeft}
            >
              <svg
                class="h-4 w-4 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              on:click={shiftDateRigth}
            >
              <svg
                class="h-4 w-4 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              on:click={() => {
                year++;
                getNumberOfDays();
              }}
            >
              <svg
                class="h-5 w-5 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap mb-3 -mx-1">
          {#each DAYS as day}
            <div style="width: 14.26%" class="px-1">
              <div class="text-gray-800 font-medium text-center text-xs">
                {day}
              </div>
            </div>
          {/each}
        </div>
        <div class="flex flex-wrap -mx-1">
          {#each blankDays as _}
            <div
              style="width: 14.28%"
              class="text-center border p-1 border-transparent text-sm"
            />
          {/each}
          {#each numberOfDays as date}
            <div style="width: 14.28%" class="px-1 mb-1">
              <div
                on:click={() => {
                  getDateValue(date);
                }}
                class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100"
                class:bg-profesnisit_blue={isToday(date) === true}
                class:hover:bg-profesnisit_blue_transparent={isToday(date) ===
                  false}
                class:hover:text-white={isToday(date) === false}
                class:text-white={isToday(date) === true}
                class:text-gray-700={isToday(date) === false}
              >
                {date}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  input {
    @apply py-2 px-4 rounded-sm w-full border border-gray-300 outline-none;
    @apply font-light;
    &:focus {
      @apply border-profesnisit_blue;
    }
    &:disabled {
      @apply text-gray-400 bg-[#f6f7fa];
    }
  }
</style>
