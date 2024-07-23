import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { BiSolidCog, BiSolidDownload, BiSolidFilePdf } from "react-icons/bi";

function IndexCareer(props) {
  const { get } = useForm({});

  const createCareer = (id) => {
    // alert(id);
    get(route("create.career", id));
  };
  const editCareer = (id) => {
    // alert(id);
    get(route("careers.edit", id));
  };

  const back = () => {
    get(route("employes.index"));
  };
  return (
    <AdminLayout>
      <Head title="Karir show - Karir" />
      <HeadNavigation title={"Karir show - Karir"} />
      <div className="my-10 bg-orange-100 min-h-screen min-w-full rounded-sm">
        <div className="p-5">
          <div className="my-3 flex justify-end">
            <button
              type="button"
              onClick={() => back()}
              className="btn btn-sm rounded-sm bg-red-600 hover:text-red-900 text-white hover:bg-red-500"
            >
              Kembali
            </button>
          </div>
          <div
            className={
              props?.career
                ? "flex flex-row justify-between "
                : "flex flex-col sm:flex-row sm:justify-between gap-2 "
            }
          >
            <p className="text-xl ml-5 underline font-bold capitalize">
              Riwayat Karir{" "}
              {props?.employe?.user_id
                ? props.employe.user.nama_lengkap
                : props.employe.name}
            </p>
            {props?.career ? (
              <button
                type="button"
                onClick={() => editCareer(props?.employe?.id)}
                className="btn btn-sm btn-circle mr-5 text-gray-600 hover:text-white bg-yellow-400 hover:bg-yellow-500 border-0"
              >
                <BiSolidCog className="text-xl" />
              </button>
            ) : (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => createCareer(props?.employe?.id)}
                  className="btn btn-sm w-fit rounded-sm mr-5 bg-blue-300 hover:bg-blue-400 border-0"
                >
                  + Tambahkan Karir
                </button>
              </div>
            )}
          </div>
          {props.career ? (
            <div className="mt-10">
              <p className="font-semibold text-lg">~ Jenjang Karir</p>
              <ul className="steps steps-vertical text-sm">
                <li className="step step-primary ml-5">
                  <div className="flex flex-col justify-start items-start py-3 gap-y-1 capitalize font-semibold">
                    <p>Mulai Masuk</p>
                    <span>{props.career.mulai_masuk}</span>
                    <a
                      disabled={props.career.sk_mulai_masuk ? false : true}
                      href={
                        props.career.sk_mulai_masuk
                          ? "/storage/sk_kontrak/" + props.career.sk_mulai_masuk
                          : "#"
                      }
                      className={`${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`}
                      // download={props.career.leader ? true : undefined}
                      target="_blank"
                    >
                      <BiSolidDownload className="text-lg " />
                      SK Masuk
                    </a>
                  </div>
                </li>

                {props.career.jenjang_karir.length > 0 &&
                  props.career.jenjang_karir.map((names, index) => {
                    return (
                      <li className="step step-primary ml-5 capitalize font-semibold">
                        <div className="flex flex-col justify-start items-start py-3 gap-y-1">
                          <p>{names}</p>
                          <a
                            href={
                              props.career.file_sk_kontrak[index]
                                ? "/storage/sk_kontrak/" +
                                  props.career.file_sk_kontrak[index]
                                : "#"
                            }
                            className={`${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`}
                            // download={props.career.leader ? true : undefined}
                            target="_blank"
                          >
                            <BiSolidDownload className="text-lg " />
                            SK Kontrak
                          </a>
                        </div>
                      </li>
                    );
                  })}

                <li className="step step-primary ml-5">
                  <a
                    disabled={props.career.leader ? false : true}
                    href={
                      props.career.leader
                        ? "/storage/sk_kontrak/" + props.career.leader
                        : "#"
                    }
                    className={`${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`}
                    // download={props.career.leader ? true : undefined}
                    target="_blank"
                  >
                    <BiSolidDownload className="text-lg " />
                    SK Leader
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-center bg-gray-100 flex justify-center py-14 sm:p-36 rounded-sm m-5">
              <span className="italic text-sm">
                {props?.employe?.user_id
                  ? props.employe.user.nama_lengkap
                  : props.employe.name}{" "}
                Belum Memiliki Riwayat Karir
              </span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default IndexCareer;
