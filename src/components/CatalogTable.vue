<script setup lang="ts">
import { useSQLite } from '../db/SQLite'
import { ref } from 'vue'
import { faTrashCan, faCheckDouble, faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { mkConfig, generateCsv, download } from "export-to-csv";
import type { Address } from '../types/Address';

const { isLoading, error, executeQuery } = useSQLite()
const sqlQuery = ref('SELECT * FROM orders_table')
const queryResult = ref<unknown[][]>([])
const queryError = ref<string | null>(null)
const { t } = useI18n();

async function runQuery() {
  queryError.value = null
  queryResult.value = []

  try {
    const result = await executeQuery(sqlQuery.value)
    const isSelect = sqlQuery.value.trim().toLowerCase().startsWith('select')

    if (isSelect) {
      queryResult.value = result?.result.resultRows || []
    }
    else {
      queryResult.value = (await executeQuery('SELECT * FROM orders_table'))?.result.resultRows || []
    }

    if (result) {
      console.log(result);
    }
  }
  catch (err) {
    console.error(error);
    queryError.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

async function createNewRegistry(name: string, address: string, phone: string, email: string) {
  const date = new Date();
  sqlQuery.value = `INSERT INTO orders_table (name, address, phone, email, completed, created_at)
    VALUES ('${name}', '${address.replace(',', '')}', '${phone}', '${email}', 'N', '${date.toLocaleString('pt-BR').replace(',', '')}')`

  runQuery()
}

async function updateRegistry(rowId: number, status: string | undefined) {
  sqlQuery.value = `UPDATE orders_table SET completed = '${status}' WHERE id = ${rowId}`

  runQuery()
}

async function deleteRegistry(rowId: number, status: string | undefined) {
  if (status)
    sqlQuery.value = `DELETE FROM orders_table WHERE id = ${rowId}`

  runQuery()
}

function exportEntries() {
  const jsonData: Address[] = [];

  queryResult.value.forEach((e) => {
    const actual: Address = {
      id: Number(e[0]),
      name: String(e[1]),
      address: String(e[2]),
      phone: String(e[3]),
      email: String(e[4]),
      completed: String(e[5]),
      created_at: String(e[6])
    }

    jsonData.push(actual)
  })

  const csvConfig = mkConfig({ useKeysAsHeaders: true })
  const csv = generateCsv(csvConfig)(jsonData)

  download(csvConfig)(csv)
}

runQuery()
</script>

<template>
  <div class="full-width">
    <AppLoading v-if="isLoading" />
    <span class="mb-6" style="display: block;">{{ t('status') }}</span>
    <table className="table-auto full-width bg-primary users-table">
      <thead>
        <tr>
          <th className="table-cell">Id</th>
          <th className="table-cell">{{ t('name') }}</th>
          <th className="table-cell">{{ t('address') }}</th>
          <th className="table-cell">{{ t('phone') }}</th>
          <th className="table-cell">{{ t('email') }}</th>
          <th className="table-cell">Status</th>
          <th className="table-cell">{{ t('created') }}</th>
          <th className="table-cell edit-cell">{{ t('delete') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="queryResult.length === 0">
          {{ t('nodata') }}
        </tr>
        <tr v-for="(item, index) in queryResult" :key=index>
          <td className="table-cell">{{ item[0] }}</td>
          <td className="table-cell">{{ item[1] }}</td>
          <td className="table-cell">{{ item[2] }}</td>
          <td className="table-cell">{{ item[3] }}</td>
          <td className="table-cell">{{ item[4] }}</td>
          <td className="table-cell cursor-pointer edit-cell">
            <ConfirmModal v-if="item[5] === 'S'" :rowId="Number(item[0])" :status="String(item[5])"
              :confirmAction="updateRegistry" :msg="t('updating')" :title="t('update')" :icon="faCheckDouble" />
            <ConfirmModal v-else :rowId="Number(item[0])" :status="String(item[5])" :confirmAction="updateRegistry"
              :msg="t('updating')" :title="t('update')" :icon="faSpinner" />
          </td>
          <td className="table-cell">{{ item[6] }}</td>
          <td className="table-cell cursor-pointer edit-cell">
            <ConfirmModal :rowId="Number(item[0])" :status="String(item[5])" :confirmAction="deleteRegistry"
              :msg="t('deleting')" :title="t('delete')" :icon="faTrashCan" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="full-width flex-end-line">
    <span @click="exportEntries" class="btn-default mr-6">
      <FontAwesomeIcon :icon="faDownload" />
    </span>
    <MainModal :createRegistry="createNewRegistry" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
