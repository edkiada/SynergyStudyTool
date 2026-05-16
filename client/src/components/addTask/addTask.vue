<script setup lang="ts">
  import { ref } from 'vue';
  import addBtn from "../../assets/icons/addBtn.svg" 
  import closeBtn from "../../assets/icons/close.svg"
  import settingIcon from "../../assets/icons/setting.svg"
  import flag from "../../assets/icons/flag.svg"
  import tag from "../../assets/icons/tag.svg"
  import { useTaskStore } from '../../stores/taskStore';

  const taskStore = useTaskStore();
  const isModalOpen = ref(false);
  const ispameraterOpen = ref(false);
  const isTyping = ref(false);
  const tasktitle = ref('');
  const selectedPriority = ref<'low' | 'medium' | 'high'>('medium');

  const selectPriority = (priority: 'low' | 'medium' | 'high') => {
    selectedPriority.value = priority;
  } 
  const handleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  }
  const handlePamerater = () => {
    ispameraterOpen.value = !ispameraterOpen.value;
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
    });
    tasktitle.value = '';
    isModalOpen.value = false;
  }

</script>

<template>
  <section class="addTaskContainer">
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
                <button type="button" class="colorChoice"></button>
                <input type="text" placeholder="Add a tag..." class="tagField"/>
              </div>
            </div>
            <button type="button" class="MiniSubmit Btn">Save</button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
  @import './addTask.css';
</style>
