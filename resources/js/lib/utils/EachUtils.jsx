import { Children } from 'react'

const EachUtils = ({ of, render, colspan }) => {
  if(of.length <= 0 )
  {
    return (
       <tr className='w-full'>
            <td colSpan={colspan ? colspan : 0} className='text-center italic text-gray-400 text-lg border-[1px] border-orange-300'>- Data Saat Ini Masih Belum Tersedia -</td>
       </tr>
    )
  }
  return Children.toArray(of.map((item, index) => render(item, index)))
}

export default EachUtils