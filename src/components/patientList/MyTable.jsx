import React from 'react'
const MyTable = () => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
            Дата
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            ФИО
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Телефон
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Диагноз
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Статус
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Записал
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300"></th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="flex items-center">
              <div>
                <div className="text-sm leading-5 text-gray-800">#1</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            damilareanjorin1@gmail.com
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            +2348106420637
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
              <span className="relative text-xs">active</span>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            September 12
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              Подробнее
            </button>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="flex items-center">
              <div>
                <div className="text-sm leading-5 text-gray-800">#1</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            damilareanjorin1@gmail.com
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            +2348106420637
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
              <span className="relative text-xs">active</span>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            September 12
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              Подробнее
            </button>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="flex items-center">
              <div>
                <div className="text-sm leading-5 text-gray-800">#1</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            damilareanjorin1@gmail.com
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            +2348106420637
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
              <span className="relative text-xs">not active</span>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            September 12
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              Подробнее
            </button>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="flex items-center">
              <div>
                <div className="text-sm leading-5 text-gray-800">#1</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            damilareanjorin1@gmail.com
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            +2348106420637
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
              <span className="relative text-xs">active</span>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            September 12
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              Подробнее
            </button>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="flex items-center">
              <div>
                <div className="text-sm leading-5 text-gray-800">#1</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div className="text-sm leading-5 text-blue-900">Damilare Anjorin</div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            damilareanjorin1@gmail.com
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            +2348106420637
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
              <span className="relative text-xs">disabled</span>
            </span>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            September 12
          </td>
          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              Подробнее
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default MyTable
