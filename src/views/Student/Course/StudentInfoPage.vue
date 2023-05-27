<template>
  <section>

    <MyPageHeader text="User infos">
      <template #icon>
        <IconUser/>
      </template>
    </MyPageHeader>

    <div class="container-fluid">
      <a-row align="center" class="gap-3" justify="center" wrap>
        <a-col :span="24" class="rounded-2 imageback d-flex justify-content-center align-items-center"
               style="height: 150px;  ">
          <div class="text-center rounded-2 d-flex justify-content-center align-items-center h-100 w-100">
            <a-avatar :size="60" :style="{ backgroundColor: '#14a9f8', marginBottom:'10px' }" auto-fix-font-size
                      class="shadow" shape="square">123
            </a-avatar>
          </div>
        </a-col>
        <a-col :span="24">
          <a-space class="container" direction="vertical" fill wrap>
            <a-descriptions :column="{xs:1,lg:3}" align="top" layout="ltr" title="Basic Informations">
              <a-descriptions-item :span="1" label="Username">Username</a-descriptions-item>
              <a-descriptions-item :span="1" label="Xuesheg Hao">Xuesheg Hao</a-descriptions-item>
              <a-descriptions-item :span="1" label="Username">Username</a-descriptions-item>
              <a-descriptions-item :span="1" label="Xuesheg Hao">Xuesheg Hao</a-descriptions-item>
              <a-descriptions-item :span="1" label="Username">Username</a-descriptions-item>
              <a-descriptions-item :span="1" label="Xuesheg Hao">Xuesheg Hao</a-descriptions-item>
              <a-descriptions-item :span="1" label="Username">Username</a-descriptions-item>
              <a-descriptions-item :span="1" label="Xuesheg Hao">Xuesheg Hao</a-descriptions-item>
            </a-descriptions>
          </a-space>
        </a-col>

      </a-row>
    </div>
  </section>
</template>

<script>
import MyPageHeader from "@/components/MyPageHeader";

export default {
  name: "StudentInfoPage",
  components: {MyPageHeader}
}
</script>

<style lang="scss" scoped>
.imageback {
  background-image: url("/src/assets/image1.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  & div {
    //backdrop-filter:blur(50px);
    backdrop-filter: contrast(0.3) blur(10px) opacity(0.9);

    & div {

    }
  }
}
</style>