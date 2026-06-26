<script setup lang="ts">
  import { ref } from 'vue';
  import addBtn from "../../../assets/icons/addBtn.svg" 
  import closeBtn from "../../../assets/icons/close.svg"
  import settingIcon from "../../../assets/icons/setting.svg"
  import flag from "../../../assets/icons/flag.svg"
  import tag from "../../../assets/icons/tag.svg"
  import { useTaskStore } from '../../../stores/taskStore';
  import { useUserStore } from '../../../stores/userStore';

  const taskStore = useTaskStore();
  const userStore = useUserStore();
  const isModalOpen = ref(false);
  const ispameraterOpen = ref(false);
  const isColorPickerOpen = ref(false);
  const isTyping = ref(false);
  const tasktitle = ref('');
  const tagText = ref('');
  const selectedPriority = ref<'low' | 'medium' | 'high'>('medium');
  const selectedColor = ref('--tagColorRed');
  const themeColor = [
    '--tagColorRed',
    '--tagColorGreen',
    '--tagColorYellow',
    '--tagColorBlue',
    '--tagColorPurple',
    '--tagColorOrange',
    '--tagColorTeal',
    '--tagColorGray',
  ]


  const selectPriority = (priority: 'low' | 'medium' | 'high') => {
    selectedPriority.value = priority;
  } 
  const selectColor = (color: string) => {
    selectedColor.value = color;
    isColorPickerOpen.value = false;
  }
  const toggleColorPicker = () => {
    isColorPickerOpen.value = !isColorPickerOpen.value;
  }

  const handleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  }
  const handlePamerater = () => {
    ispameraterOpen.value = !ispameraterOpen.value;
    isColorPickerOpen.value = false;
  }
  const handleFocus = () => {
    isTyping.value = true; 
  };
  const handleBlur = () => {
    isTyping.value = false; 
  };

  const onSubmit = () => {
    if (tasktitle.value.trim() === '') return;
    taskStore.saveTask({
      title: tasktitle.value,
      priority: selectedPriority.value,
      tagText: tagText.value,
      tagColor: selectedColor.value,
    });
    tasktitle.value = '';
    isModalOpen.value = false;
  }

</script>

<template>
  <section class="addTaskContainer" v-if="userStore.test">
    <button @click="handleModal" class="addTaskBtn"><img :src="addBtn" alt="addBtn"></button>
    <Teleport to="body">
      <div class="overlay" v-if="isModalOpen">
        <div class="top">
          <button @click="handleModal" class="clossBtn Btn"><img :src="closeBtn"></button>
          <textarea class="taskField" @focus="handleFocus" @blur="handleBlur" placeholder="Write a new task..." v-model="tasktitle"></textarea>
        </div>
        <div :class="{ 'keybordOpen': isTyping }" class="ControlBtn">
          <button type="button" class="setting Btn" @click="handlePamerater"><img :src="settingIcon"></button>
          <button type="button" class="submit Btn" @click="onSubmit">Save</button>
          <div class="pamerater" v-show="ispameraterOpen">
            <div class="pameraterItem">
              <div class="parameterTitle">
                <img :src="flag" alt="flag"/>
                <span>Priority</span>
              </div>
              <div class="priorityContainer">
                <button type="button" class="priorityItem Btn" id="LowBtn" :class="{'lowPriority' : selectedPriority === 'low'}"  @click="selectPriority('low')"><span>LOW</span></button>
                <button type="button" class="priorityItem Btn" id="MediumBtn" :class="{'mediumPriority' : selectedPriority === 'medium'}" @click="selectPriority('medium')"><span>MEDIUM</span></button>
                <button type="button" class="priorityItem Btn" id="HighBtn" :class="{'highPriority' : selectedPriority === 'high'}" @click="selectPriority('high')"><span>HIGH</span></button>
              </div>
            </div>
            <div class="pameraterItem">
              <div class="parameterTitle">
                <img :src="tag" alt="tag"/>
                <span>Tag</span>
              </div>
              <div class="tagContainer">
                <button type="button" class="colorChoice" @click="toggleColorPicker" :style="{ backgroundColor : `var(${selectedColor})`}"></button>
                <input type="text" placeholder="Add a tag..." class="tagField" v-model="tagText"/>
              </div>
            </div>
            <button type="button" class="MiniSubmit Btn">Save</button>
          </div>
          <div class="colorPicker" v-if="isColorPickerOpen">
            <button v-for="(color, index) in themeColor" :key="index" class="colorOption Btn" :style="{ backgroundColor: `var(${color})` }" @click="selectColor(color)"></button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
  @import './addTask.css';
</style>
