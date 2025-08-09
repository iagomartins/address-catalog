<template>
  <div>
    <span @click="open = true" class="btn-default">
      <FontAwesomeIcon :icon="faPlus" />
    </span>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-background px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 full-width text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold text-white">{{ t('create') }}
                        {{ t('registry') }}
                      </DialogTitle>
                      <div class="mt-2 full-width">
                        <form class="space-y-6 full-width" action="#" method="POST">
                          <div class="mt-6 full-width">
                            <label for="name" class="block text-sm/6 font-medium text-gray-100">{{ t('name') }}</label>
                            <div class="mt-2">
                              <input v-model="formValues.name" type="text" name="name" id="name" autocomplete="name"
                                required="true"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                          </div>

                          <div class="mt-6 full-width">
                            <label for="address" class="block text-sm/6 font-medium text-gray-100">{{ t('address')
                              }}</label>
                            <div class="mt-2">
                              <input v-model="formValues.address" type="text" name="address" id="address"
                                autocomplete="address" required="true"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                          </div>

                          <div class="mt-6 full-width">
                            <label for="phone" class="block text-sm/6 font-medium text-gray-100">{{ t('phone')
                              }}</label>
                            <div class="mt-2">
                              <input v-model="formValues.phone" type="text" name="phone" id="phone" autocomplete="phone"
                                required="true"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                          </div>

                          <div class="my-6 full-width">
                            <label for="email" class="block text-sm/6 font-medium text-gray-100">{{ t('email')
                              }}</label>
                            <div class="mt-2">
                              <input v-model="formValues.email" type="email" name="email" id="email"
                                autocomplete="email" required="true"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-soft px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-white shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="open = false" ref="cancelButtonRef">{{ t('cancel') }}</button>
                  <button type="button"
                    class="mt-3 mr-3 inline-flex w-full justify-center rounded-md bg-action px-3 py-2 text-sm font-semibold text-white shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="() => {
                      createRegistry(formValues.name, formValues.address, formValues.phone, formValues.email)
                      open = false
                    }" ref="cancelButtonRef">{{ t('create') }}</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';

const open = ref(false)
const { t } = useI18n()
const formValues = ref({
  name: '',
  address: '',
  phone: '',
  email: ''
})

defineProps<{
  createRegistry: (name: string, address: string, phone: string, email: string) => Promise<void>
}>()
</script>
