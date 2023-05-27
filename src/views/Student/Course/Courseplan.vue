<template>
  <section>
    <MyPageHeader text="Course Plan">
      <template #icon>
        <icon-bar-chart/>
      </template>
    </MyPageHeader>
    <div class="container">
      <a-collapse>
        <a-collapse-item key="1" class="bg-white" header="Semester 1">
          <template #extra>
            <icon-copy/>
          </template>
          <a-list :bordered="false" class="" hoverable split>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" href="course/123456" status="primary">
                2019 - Software Engineering Class - Semester 1
              </router-link>
            </a-list-item>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2020 - Software Engineering Class - Semester 2
              </router-link>
            </a-list-item>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2022 - Software Engineering Class - Semester 2
              </router-link>
            </a-list-item>
          </a-list>
        </a-collapse-item>
        <a-collapse-item :key="2" header="Semester 2">
          <a-list :bordered="false" :data="[2]" class="" hoverable split>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2019 - Software Engineering Class - Semester 1
              </router-link>
            </a-list-item>
          </a-list>
        </a-collapse-item>
        <a-collapse-item :key="3" header="Semester 3">
          <a-list :bordered="false" :data="[2]" class="" hoverable split>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2019 - Software Engineering Class - Semester 1
              </router-link>
            </a-list-item>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2019 - Software Engineering Class - Semester 1
              </router-link>
            </a-list-item>
            <a-list-item>
              <router-link :to="{name: 'student_course_details', params:{cid:'123456'}}" class="text-dark bg-transparent p-2" status="primary">
                2019 - Software Engineering Class - Semester 1
              </router-link>
            </a-list-item>
          </a-list>
        </a-collapse-item>
      </a-collapse>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "Courseplan",
  components: {MyPageHeader}
}
</script>

<style scoped>

</style>